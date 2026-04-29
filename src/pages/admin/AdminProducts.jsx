import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Plus, Trash2, Edit3, CheckCircle, XCircle, Save, Loader, ExternalLink, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

const EMOJI_LIST = [
  '📦','🌍','🚀','📤','💳','🧾','📁','⚡','🛒','🔗','💼','🏪',
  '📊','🔐','💰','📱','🌐','🤖','✨','🛠','📝','🎯','🏆','💡',
  '🎓','🔧','📲','💻','🏠','🚗','✈️','🍽️','🎵','📸','🔬','🏥',
  '⚽','🎮','🌱','☀️','🐾','🛡️','🔑','📡','🎪','🏗️','💎','🌟',
  '✝️','🙏','📖','⛪','🕊️','🎺','💐','🌈','🔔','🕯️','🫶','👑',
];

function EmojiPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Emoji</label>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          style={{ width: '100%', padding: '10px', border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 24, cursor: 'pointer', background: '#F9FAFB', textAlign: 'center', lineHeight: 1 }}
        >
          {value || '📦'}
        </button>
      </div>

      {/* Overlay plein écran pour fermer */}
      {open && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Picker positionné en fixed au centre */}
      {open && (
        <div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 201,
          background: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: 16,
          padding: 16,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 6,
          boxShadow: '0 16px 48px rgba(0,0,0,.18)',
          width: 340,
          maxHeight: '70vh',
          overflowY: 'auto',
        }}>
          {EMOJI_LIST.map(e => (
            <button
              key={e}
              type="button"
              onClick={() => { onChange(e); setOpen(false); }}
              style={{
                fontSize: 22, padding: '6px', borderRadius: 8, border: 'none',
                cursor: 'pointer', lineHeight: 1, textAlign: 'center',
                background: value === e ? '#F5E6C0' : 'transparent',
                transition: 'background .15s',
              }}
              onMouseEnter={e2 => e2.currentTarget.style.background = '#F5E6C0'}
              onMouseLeave={e2 => e2.currentTarget.style.background = value === e ? '#F5E6C0' : 'transparent'}
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', emoji: '📦', link: '', category: '', active: true, order: 0
  });

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, 'products'));
    let productsList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    // Trier par ordre (les produits sans order vont à la fin)
    productsList.sort((a, b) => {
      const orderA = a.order !== undefined ? a.order : 9999;
      const orderB = b.order !== undefined ? b.order : 9999;
      return orderA - orderB;
    });
    setProducts(productsList);
    setLoading(false);
  };

  const updateOrder = async (updatedProducts) => {
    // Mettre à jour l'ordre de chaque produit dans Firebase
    const updatePromises = updatedProducts.map((product, index) => {
      if (product.order !== index) {
        return updateDoc(doc(db, 'products', product.id), { order: index });
      }
      return Promise.resolve();
    });
    await Promise.all(updatePromises);
    setProducts(updatedProducts.map((p, i) => ({ ...p, order: i })));
    toast.success('Ordre mis à jour');
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index);
    // Pour améliorer l'expérience
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
    setDragOverId(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null) return;
    if (dragOverId !== index) {
      setDragOverId(index);
    }
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null) return;
    
    const dragIndex = draggedItem;
    
    if (dragIndex === dropIndex) {
      setDraggedItem(null);
      setDragOverId(null);
      return;
    }
    
    const reorderedProducts = [...products];
    const [removed] = reorderedProducts.splice(dragIndex, 1);
    reorderedProducts.splice(dropIndex, 0, removed);
    
    // Mettre à jour l'affichage immédiatement
    setProducts(reorderedProducts);
    
    // Sauvegarder l'ordre dans Firebase
    await updateOrder(reorderedProducts);
    
    setDraggedItem(null);
    setDragOverId(null);
  };

  const resetForm = () => {
    setForm({ name: '', description: '', emoji: '📦', link: '', category: '', active: true, order: products.length });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setForm({
      name:        product.name        || '',
      description: product.description || '',
      emoji:       product.emoji       || '📦',
      link:        product.link        || '',
      category:    product.category    || '',
      active:      product.active !== false,
      order:       product.order !== undefined ? product.order : products.length,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) { toast.error('Nom et description requis'); return; }
    setSaving(true);
    try {
      const productData = { 
        ...form, 
        updatedAt: new Date().toISOString(),
        order: editingId ? form.order : products.length 
      };
      
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), productData);
        toast.success('Produit mis à jour');
      } else {
        await addDoc(collection(db, 'products'), { 
          ...productData, 
          createdAt: new Date().toISOString(),
          order: products.length 
        });
        toast.success('Produit ajouté');
      }
      resetForm();
      loadProducts();
    } catch { toast.error('Erreur'); }
    finally { setSaving(false); }
  };

  const handleToggle = async (id, active) => {
    try {
      await updateDoc(doc(db, 'products', id), { active: !active });
      loadProducts();
      toast.success('Statut mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      // Recharger et réordonner
      await loadProducts();
      toast.success('Produit supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 outline-none";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-sm text-gray-500">{products.length} produit{products.length > 1 ? 's' : ''}</p>
          <p className="text-xs text-gray-400 mt-1">💡 Glissez-déposez pour réorganiser les produits</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg flex items-center gap-1.5">
          <Plus size={14} /> Ajouter un produit
        </button>
      </div>

      {/* Liste avec drag & drop */}
      <div className="space-y-2">
        {products.map((p, index) => (
          <div 
            key={p.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            className={`bg-white rounded-xl border p-4 flex items-center justify-between hover:border-gray-200 transition-all cursor-move ${
              dragOverId === index ? 'border-2 border-yellow-400 bg-yellow-50' : 'border-gray-100'
            }`}
            style={{
              transition: 'all 0.2s ease',
              opacity: draggedItem === index ? 0.3 : 1
            }}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                <GripVertical size={20} />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">{p.emoji || '📦'}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                  <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">#{index + 1}</span>
                  {p.active === false && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Inactif</span>}
                </div>
                <p className="text-xs text-gray-500 truncate max-w-md">{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-600 hover:text-yellow-700 flex items-center gap-1 mt-1">
                    <ExternalLink size={10} /> {p.link.substring(0, 40)}…
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => handleToggle(p.id, p.active)} className={`p-1.5 rounded-lg ${p.active !== false ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-400 hover:bg-gray-100'}`}>
                {p.active !== false ? <CheckCircle size={14} /> : <XCircle size={14} />}
              </button>
              <button onClick={() => handleEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit3 size={14} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={resetForm}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900">{editingId ? 'Modifier le produit' : 'Ajouter un produit'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">

              <div className="grid grid-cols-3 gap-3">
                {/* Emoji picker */}
                <EmojiPicker value={form.emoji} onChange={v => setForm({ ...form, emoji: v })} />
                <div className="col-span-2">
                  <label className={labelClass}>Nom *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass} rows="3" required />
              </div>
              <div>
                <label className={labelClass}>Lien du site</label>
                <input type="url" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className={inputClass} placeholder="https://..." />
              </div>
              <div>
                <label className={labelClass}>Catégorie</label>
                <input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass} placeholder="Paiement, Facturation..." />
              </div>

              {editingId && (
                <div>
                  <label className={labelClass}>Position</label>
                  <input 
                    type="number" 
                    value={form.order} 
                    onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} 
                    className={inputClass} 
                    placeholder="Ordre d'affichage"
                    min="0"
                    max={products.length}
                  />
                  <p className="text-xs text-gray-400 mt-1">0 = premier, {products.length} = dernier</p>
                </div>
              )}

              <button type="submit" disabled={saving}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <Loader className="animate-spin" size={14} /> : <Save size={14} />}
                {editingId ? 'Mettre à jour' : 'Ajouter le produit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}