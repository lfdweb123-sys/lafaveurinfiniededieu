import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ArrowRight, ExternalLink, Package } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'products')).then(snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.active !== false));
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">Nos Produits</h1>
          <p className="text-gray-600">Découvrez nos solutions innovantes</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun produit pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <a key={p.id} href={p.link || '#'} target={p.link ? '_blank' : '_self'} rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all group block">
                <div className="text-4xl mb-4">{p.emoji || '📦'}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{p.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 group-hover:text-gold-700">
                  {p.link ? 'Visiter le site' : 'En savoir plus'} <ExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}