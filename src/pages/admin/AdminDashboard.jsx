import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Package, Eye, Globe } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'products')).then(snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">{products.length} produit{products.length > 1 ? 's' : ''} en ligne</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center mb-3">
            <Package size={20} className="text-gold-600" />
          </div>
          <p className="text-sm text-gray-500">Produits</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
            <Globe size={20} className="text-emerald-600" />
          </div>
          <p className="text-sm text-gray-500">En ligne</p>
          <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.active !== false).length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
            <Eye size={20} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-500">Visites (simulé)</p>
          <p className="text-2xl font-bold text-gray-900">—</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Produits récents</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {products.slice(0, 5).map(p => (
            <div key={p.id} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">{p.emoji || '📦'}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category || 'Non catégorisé'}</p>
                </div>
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gold-600 hover:text-gold-700 font-medium">
                Visiter →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}