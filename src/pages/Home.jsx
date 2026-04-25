import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Globe, Code2, Smartphone, Shield, CheckCircle, 
  Zap, ChevronRight, ArrowUp, Menu, X, Sparkles,
  Server, Cloud, Database, Palette, BarChart3, Users
} from 'lucide-react';

const SLIDE_WORDS = [
  { word: 'l\'Afrique', color: '#D4A017' },
  { word: 'le Bénin', color: '#008751' },
  { word: 'le monde', color: '#E8112D' },
  { word: 'l\'Europe', color: '#0057FF' },
];

function WordSlider() {
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setOut(true);
      setTimeout(() => { setIndex(i => (i + 1) % SLIDE_WORDS.length); setOut(false); }, 320);
    }, 2400);
    return () => clearInterval(t);
  }, []);
  const { word, color } = SLIDE_WORDS[index];
  return (
    <span style={{ color, display: 'inline-block', transition: 'opacity .28s ease, transform .28s ease', opacity: out ? 0 : 1, transform: out ? 'translateY(14px)' : 'translateY(0)' }}>
      {word}
    </span>
  );
}

const PRODUCTS = [
  { name: 'Passerelle de Paiement', desc: '15 providers, 40+ pays, Mobile Money, cartes, PayPal. API REST complète.', icon: Globe, link: 'https://payment-gateway-iota-bay.vercel.app', color: '#D4A017', bg: 'from-amber-50 to-yellow-50' },
  { name: 'Facture App', desc: 'Factures, contrats, paiements en ligne. Assistant IA intégré pour freelances et PME.', icon: Shield, link: 'https://facture-app-sigma.vercel.app', color: '#2563EB', bg: 'from-blue-50 to-indigo-50' },
  { name: 'Prochain Produit', desc: 'Une nouvelle solution innovante en cours de développement. Restez connecté.', icon: Sparkles, link: '#', color: '#7C3AED', bg: 'from-purple-50 to-violet-50', coming: true }
];

const SERVICES = [
  { icon: Code2, title: 'Développement Web', desc: 'Sites vitrines, applications web, plateformes SaaS sur mesure.' },
  { icon: Smartphone, title: 'Applications Mobiles', desc: 'iOS, Android, cross-platform. Solutions mobiles performantes.' },
  { icon: Cloud, title: 'Solutions Cloud', desc: 'Hébergement, déploiement, scalabilité. Infrastructure robuste.' },
  { icon: Database, title: 'APIs & Backend', desc: 'Conception d\'APIs REST, microservices, architectures backend.' },
  { icon: Palette, title: 'Design UI/UX', desc: 'Interfaces modernes, expérience utilisateur optimale, design pro.' },
  { icon: BarChart3, title: 'Conseil Technique', desc: 'Audit, architecture, accompagnement technique personnalisé.' }
];

const TECH_STACK = [
  'React', 'Vue.js', 'Node.js', 'Firebase', 'Vercel', 'TailwindCSS',
  'Python', 'Flutter', 'MongoDB', 'PostgreSQL', 'AWS', 'Stripe'
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 20); setShowTop(window.scrollY > 500); };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-decoration-none">
            <div className="w-9 h-9 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/30">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-gray-900 text-base hidden sm:block">
              La Faveur Infinie de Dieu
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {[['/#products','Produits'],['/#services','Services'],['/#about','À propos'],['/contact','Contact']].map(([href, label]) => (
              <a key={href} href={href} className="text-sm text-gray-600 hover:text-gold-500 font-medium transition-colors">{label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
              Nous contacter
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
            {[['/#products','Produits'],['/#services','Services'],['/contact','Contact']].map(([href, label]) => (
              <a key={href} href={href} className="block py-2 text-sm text-gray-700" onClick={() => setMobileMenuOpen(false)}>{label}</a>
            ))}
            <Link to="/contact" className="block w-full text-center bg-gold-500 text-white py-2.5 rounded-xl text-sm font-semibold">Nous contacter</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gold-50/50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap size={14} /> Solutions numériques innovantes
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
            Nous créons des solutions<br />
            <span className="text-gray-700">digitales pour </span>
            <WordSlider />
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            La Faveur Infinie de Dieu développe des produits technologiques innovants : passerelle de paiement, 
            application de facturation, et bien plus. Des solutions conçues pour les entreprises africaines et mondiales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all inline-flex items-center justify-center gap-2">
              Découvrir nos produits <ArrowRight size={18} />
            </a>
            <Link to="/contact" className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:border-gold-300 transition-all inline-flex items-center justify-center">
              Nous contacter
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <CheckCircle size={14} className="text-emerald-500" /> Qualité garantie
            <CheckCircle size={14} className="text-emerald-500" /> Support 24/7
            <CheckCircle size={14} className="text-emerald-500" /> Innovation continue
          </div>
        </div>
      </section>

      {/* PRODUITS */}
      <section id="products" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap size={12} /> Nos Produits
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Des solutions qui font la différence
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Chaque produit est conçu avec soin pour répondre aux besoins réels des entreprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <a key={i} href={p.link} target={p.link !== '#' ? '_blank' : '_self'} rel="noopener noreferrer"
                className={`relative group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all ${p.coming ? 'opacity-80' : ''}`}>
                {p.coming && (
                  <div className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">Bientôt</div>
                )}
                <div className="w-14 h-14 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <p.icon size={28} style={{ color: p.color }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{p.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: p.color }}>
                  {p.coming ? 'Bientôt disponible' : 'Visiter le site'} <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">Nos Services</h2>
            <p className="text-gray-600 max-w-xl mx-auto">De l'idée à la réalisation, nous vous accompagnons à chaque étape.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                  <s.icon size={20} className="text-gray-700 group-hover:text-gold-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Technologies utilisées</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map(tech => (
              <span key={tech} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gold-100 hover:text-gold-700 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">Un projet en tête ?</h2>
          <p className="text-white/90 text-lg mb-8">Parlons-en. Nous vous aiderons à le concrétiser.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-gold-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all">
            Contactez-nous <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}