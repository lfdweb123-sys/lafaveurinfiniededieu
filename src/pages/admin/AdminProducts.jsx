import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Plus, Trash2, Edit3, CheckCircle, XCircle, Save, Loader, Eye, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', emoji: '📦', link: '', category: '', active: true
  });

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, 'products'));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ name: '', description: '', emoji: '📦', link: '', category: '', active: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || '',
      description: product.description || '',
      emoji: product.emoji || '📦',
      link: product.link || '',
      category: product.category || '',
      active: product.active !== false
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) { toast.error('Nom et description requis'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), { ...form, updatedAt: new Date().toISOString() });
        toast.success('Produit mis à jour');
      } else {
        await addDoc(collection(db, 'products'), { ...form, createdAt: new Date().toISOString() });
        toast.success('Produit ajouté');
      }
      resetForm();
      loadProducts();
    } catch { toast.error('Erreur'); }
    finally { setSaving(false); }
  };

  const handleToggle = async (id, active) => {
    await updateDoc(doc(db, 'products', id), { active: !active });
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return;
    await deleteDoc(doc(db, 'products', id));
    loadProducts();
    toast.success('Produit supprimé');
  };

  const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400 outline-none";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-sm text-gray-500">{products.length} produit{products.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg flex items-center gap-1.5">
          <Plus size={14} /> Ajouter un produit
        </button>
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:border-gray-200 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">{p.emoji || '📦'}</div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                  {p.active === false && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Inactif</span>}
                </div>
                <p className="text-xs text-gray-500 truncate max-w-md">{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gold-600 hover:text-gold-700 flex items-center gap-1 mt-1">
                    <ExternalLink size={10} /> {p.link.substring(0, 40)}...
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => handleToggle(p.id, p.active)} className={`p-1.5 rounded-lg ${p.active !== false ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-400 hover:bg-gray-200'}`}>
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
                <div>
                  <label className={labelClass}>Emoji</label>
                  <input type="text" value={form.emoji} onChange={e => setForm({...form, emoji: e.target.value})} className={inputClass} maxLength={2} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Nom *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} required />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description *</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputClass} rows="3" required />
              </div>
              <div>
                <label className={labelClass}>Lien du site</label>
                <input type="url" value={form.link} onChange={e => setForm({...form, link: e.target.value})} className={inputClass} placeholder="https://..." />
              </div>
              <div>
                <label className={labelClass}>Catégorie</label>
                <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass} placeholder="Paiement, Facturation..." />
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
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