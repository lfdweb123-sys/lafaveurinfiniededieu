import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-white font-bold">LFD</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">Solutions numériques innovantes pour l'Afrique et le monde.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:text-white">Accueil</Link>
              <a href="/#products" className="block hover:text-white">Produits</a>
              <Link to="/contact" className="block hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Produits</h4>
            <div className="space-y-2 text-sm">
              <a href="https://payment-gateway-iota-bay.vercel.app" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Passerelle de Paiement</a>
              <a href="https://facture-app-sigma.vercel.app" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Facture App</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} /> contact@lfd.com</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +229 97 00 00 00</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> Cotonou, Bénin</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} La Faveur Infinie de Dieu. Tous droits réservés.</p>
          <p className="text-sm">Développé avec ❤️ depuis le Bénin</p>
        </div>
      </div>
    </footer>
  );
}