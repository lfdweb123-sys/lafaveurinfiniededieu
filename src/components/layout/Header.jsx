import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 20));
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-extrabold text-gray-900 hidden sm:block">La Faveur Infinie de Dieu</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-gold-500 font-medium">Accueil</Link>
          <a href="/#products" className="text-sm text-gray-600 hover:text-gold-500 font-medium">Produits</a>
          <a href="/#services" className="text-sm text-gray-600 hover:text-gold-500 font-medium">Services</a>
          <Link to="/contact" className="text-sm text-gray-600 hover:text-gold-500 font-medium">Contact</Link>
        </div>

        <Link to="/contact" className="hidden md:block bg-gradient-to-r from-gold-500 to-gold-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          Nous contacter
        </Link>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          <Link to="/" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>Accueil</Link>
          <a href="/#products" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>Produits</a>
          <Link to="/contact" className="block w-full text-center bg-gold-500 text-white py-2.5 rounded-xl text-sm font-semibold">Nous contacter</Link>
        </div>
      )}
    </nav>
  );
}