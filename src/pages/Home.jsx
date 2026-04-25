import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, Code2, Smartphone, Shield, CheckCircle,
  Zap, ArrowUp, Menu, X, Sparkles,
  Cloud, Database, Palette, BarChart3
} from 'lucide-react';

/* ─── Word slider ──────────────────────────────────────────── */
const SLIDE_WORDS = [
  { word: "l'Afrique",  color: '#C8931A' },
  { word: 'le Bénin',   color: '#008751' },
  { word: 'le monde',   color: '#C8931A' },
  { word: "l'Europe",   color: '#0057FF' },
];

function WordSlider() {
  const [index, setIndex] = useState(0);
  const [out,   setOut]   = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setOut(true);
      setTimeout(() => { setIndex(i => (i + 1) % SLIDE_WORDS.length); setOut(false); }, 300);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  const { word, color } = SLIDE_WORDS[index];
  return (
    <span style={{
      color,
      display: 'inline-block',
      transition: 'opacity .25s ease, transform .25s ease',
      opacity: out ? 0 : 1,
      transform: out ? 'translateY(10px)' : 'translateY(0)',
    }}>
      {word}
    </span>
  );
}

/* ─── Data ─────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name: 'Passerelle de Paiement',
    desc: '15 providers, 40+ pays, Mobile Money, cartes, PayPal. API REST complète.',
    icon: Globe,
    link: 'https://payment-gateway-iota-bay.vercel.app',
    accent: '#C8931A',
    tag: 'En ligne',
  },
  {
    name: 'Facture App',
    desc: 'Factures, contrats, paiements en ligne. Assistant IA intégré pour freelances et PME.',
    icon: Shield,
    link: 'https://facture-app-sigma.vercel.app',
    accent: '#2563EB',
    tag: 'En ligne',
  },
  {
    name: 'Prochain Produit',
    desc: 'Une nouvelle solution innovante en cours de développement. Restez connecté.',
    icon: Sparkles,
    link: '#',
    accent: '#7C3AED',
    tag: 'Bientôt',
    coming: true,
  },
];

const SERVICES = [
  { icon: Code2,      title: 'Développement Web',    desc: 'Sites vitrines, applications web, plateformes SaaS sur mesure.' },
  { icon: Smartphone, title: 'Applications Mobiles',  desc: 'iOS, Android, cross-platform. Solutions mobiles performantes.' },
  { icon: Cloud,      title: 'Solutions Cloud',       desc: 'Hébergement, déploiement, scalabilité. Infrastructure robuste.' },
  { icon: Database,   title: 'APIs & Backend',        desc: "Conception d'APIs REST, microservices, architectures backend." },
  { icon: Palette,    title: 'Design UI/UX',          desc: 'Interfaces modernes, expérience utilisateur optimale, design pro.' },
  { icon: BarChart3,  title: 'Conseil Technique',     desc: 'Audit, architecture, accompagnement technique personnalisé.' },
];

const TECH = ['React','Vue.js','Node.js','Firebase','Vercel','TailwindCSS','Python','Flutter','MongoDB','PostgreSQL','AWS','Stripe'];

const NAV_LINKS = [['/#products','Produits'],['/#services','Services'],['/#about','À propos'],['/contact','Contact']];

/* ─── Component ─────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop,  setShowTop]  = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 10);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ fontFamily: "'Sora','Plus Jakarta Sans',sans-serif", background: '#FAFAF8', color: '#111', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .ani-1 { animation: fadeUp .55s .05s ease both; }
        .ani-2 { animation: fadeUp .55s .15s ease both; }
        .ani-3 { animation: fadeUp .55s .25s ease both; }
        .ani-4 { animation: fadeUp .55s .35s ease both; }
        a { text-decoration: none; color: inherit; }
        .nav-link { font-size: 14px; font-weight: 500; color: #555; transition: color .18s; white-space: nowrap; }
        .nav-link:hover { color: #C8931A; }
        .btn-gold { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#D4A017,#B07D10); color:#fff; font-weight:700; font-size:14px; padding:12px 26px; border-radius:12px; border:none; cursor:pointer; transition:all .2s; box-shadow:0 4px 18px rgba(200,147,26,.3); text-decoration:none; }
        .btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(200,147,26,.45); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#333; font-weight:600; font-size:14px; padding:12px 26px; border-radius:12px; border:1.5px solid #E5E5E5; cursor:pointer; transition:all .2s; text-decoration:none; }
        .btn-outline:hover { border-color:#C8931A; color:#C8931A; }
        .card { background:#fff; border:1px solid #EBEBEB; border-radius:20px; transition:all .25s; text-decoration:none; display:block; }
        .card:hover { box-shadow:0 12px 40px rgba(0,0,0,.08); transform:translateY(-3px); border-color:#DDD; }
        .pill { display:inline-flex; align-items:center; gap:5px; background:#F5E6C0; color:#9E7214; font-size:11px; font-weight:700; padding:4px 12px; border-radius:100px; letter-spacing:.05em; text-transform:uppercase; }
        .tech-chip { background:#F3F3F1; color:#555; font-size:12px; font-weight:500; padding:7px 16px; border-radius:100px; transition:all .18s; border:1px solid transparent; cursor:default; }
        .tech-chip:hover { background:#F5E6C0; color:#9E7214; }
        .svc-icon { transition: background .2s; }
        .service-card { background:#fff; border:1px solid #EBEBEB; border-radius:18px; padding:28px; transition:all .22s; }
        .service-card:hover { box-shadow:0 8px 32px rgba(0,0,0,.07); transform:translateY(-2px); }
        .service-card:hover .svc-icon { background:#F5E6C0 !important; }

        /* Mobile nav — show burger only on small screens */
        .nav-desktop { display:flex; }
        .nav-burger  { display:none; }
        @media(max-width:820px){
          .nav-desktop { display:none !important; }
          .nav-burger  { display:flex !important; }
        }
      `}</style>

      {/* ══ IMPORTANT: pour la favicon, dans votre index.html ajoutez :
           <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      ══ */}

      {/* ══════════ NAV ══════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        /* toujours un fond solide pour éviter la superposition de texte */
        background: scrolled ? 'rgba(250,250,248,0.97)' : '#FAFAF8',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        transition: 'background .3s, border-color .3s',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <img src="/vite.svg" alt="Logo" width={34} height={34} style={{ borderRadius: 8 }} onError={e => { e.currentTarget.style.display='none'; }} />
            <span style={{ fontWeight: 800, fontSize: 15, color: '#111', whiteSpace: 'nowrap' }}>
              La Faveur Infinie de Dieu
            </span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: 34 }}>
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-desktop">
            <Link to="/contact" className="btn-gold">Nous contacter <ArrowRight size={15} /></Link>
          </div>

          {/* Burger */}
          <button
            className="nav-burger"
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#333', alignItems: 'center' }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: '#FAFAF8', borderTop: '1px solid #EBEBEB', padding: '14px 28px 22px' }}>
            {NAV_LINKS.map(([href, label], i, arr) => (
              <a key={href} href={href}
                style={{ display: 'block', padding: '13px 0', fontSize: 15, color: '#444', borderBottom: i < arr.length - 1 ? '1px solid #F0F0F0' : 'none' }}
                onClick={() => setMenuOpen(false)}
              >{label}</a>
            ))}
            <Link to="/contact" className="btn-gold"
              style={{ marginTop: 18, width: '100%', justifyContent: 'center' }}
              onClick={() => setMenuOpen(false)}
            >
              Nous contacter <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section style={{ paddingTop: 128, paddingBottom: 100, paddingLeft: 28, paddingRight: 28, background: 'linear-gradient(160deg,#FFFDF5 0%,#FAFAF8 60%)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>

          <div className="ani-1 pill" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <Zap size={11} /> Solutions numériques innovantes
          </div>

          <h1 className="ani-2" style={{ fontSize: 'clamp(34px,5.5vw,70px)', fontWeight: 900, lineHeight: 1.07, letterSpacing: '-.03em', color: '#0A0A0A', marginBottom: 22 }}>
            Nous créons des solutions<br />
            <span style={{ color: '#555' }}>digitales pour </span>
            <WordSlider />
          </h1>

          <p className="ani-3" style={{ fontSize: 17, color: '#666', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 36px' }}>
            La Faveur Infinie de Dieu développe des produits technologiques innovants : passerelle de paiement, application de facturation, et bien plus.
          </p>

          <div className="ani-4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <a href="#products" className="btn-gold" style={{ fontSize: 15, padding: '14px 30px' }}>
              Découvrir nos produits <ArrowRight size={17} />
            </a>
            <Link to="/contact" className="btn-outline" style={{ fontSize: 15, padding: '14px 30px' }}>
              Nous contacter
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {['Qualité garantie', 'Support 24/7', 'Innovation continue'].map((t, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#888' }}>
                <CheckCircle size={13} style={{ color: '#16A34A' }} /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRODUITS ══════════ */}
      <section id="products" style={{ padding: '90px 28px', background: '#fff', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="pill" style={{ marginBottom: 14, display: 'inline-flex' }}>
              <Zap size={11} /> Nos Produits
            </div>
            <h2 style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 900, color: '#0A0A0A', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 14 }}>
              Des solutions qui font la différence
            </h2>
            <p style={{ fontSize: 16, color: '#777', maxWidth: 440, margin: '0 auto' }}>
              Chaque produit est conçu avec soin pour répondre aux besoins réels des entreprises.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 22 }}>
            {PRODUCTS.map((p, i) => (
              <a key={i} href={p.link} target={p.link !== '#' ? '_blank' : '_self'} rel="noopener noreferrer"
                className="card"
                style={{ padding: '36px 30px', position: 'relative', opacity: p.coming ? .82 : 1 }}
              >
                <span style={{
                  position: 'absolute', top: 18, right: 18,
                  fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                  background: p.coming ? '#EDE9FE' : '#ECFDF5',
                  color: p.coming ? '#7C3AED' : '#15803D',
                }}>
                  {p.tag}
                </span>

                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: `${p.accent}1A`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                }}>
                  <p.icon size={26} style={{ color: p.accent }} />
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 10 }}>{p.name}</h3>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7, marginBottom: 22 }}>{p.desc}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: p.accent }}>
                  {p.coming ? 'Bientôt disponible' : 'Visiter le site'} <ArrowRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" style={{ padding: '90px 28px', background: '#F7F7F5', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 900, color: '#0A0A0A', letterSpacing: '-.03em', marginBottom: 12 }}>
              Nos Services
            </h2>
            <p style={{ fontSize: 16, color: '#777', maxWidth: 400, margin: '0 auto' }}>
              De l'idée à la réalisation, nous vous accompagnons à chaque étape.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="svc-icon" style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: '#F0F0EE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <s.icon size={19} style={{ color: '#666' }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TECH ══════════ */}
      <section style={{ padding: '60px 28px', background: '#fff', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#BBB', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 22 }}>
            Technologies utilisées
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {TECH.map(t => <span key={t} className="tech-chip">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section style={{ padding: '90px 28px', background: 'linear-gradient(135deg,#C8931A 0%,#9E7214 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 900, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Un projet en tête ?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.85)', marginBottom: 36, lineHeight: 1.65 }}>
            Parlons-en. Nous vous aiderons à le concrétiser.
          </p>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#9E7214', fontWeight: 700, fontSize: 15,
            padding: '15px 36px', borderRadius: 12, textDecoration: 'none',
            boxShadow: '0 6px 28px rgba(0,0,0,.15)', transition: 'all .2s'
          }}>
            Contactez-nous <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background: '#0A0A0A', padding: '36px 28px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <img src="/vite.svg" alt="Logo" width={24} height={24} style={{ borderRadius: 6, opacity: .7 }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#666' }}>La Faveur Infinie de Dieu</span>
        </div>
        <p style={{ fontSize: 12, color: '#444' }}>© {new Date().getFullYear()} Tous droits réservés · Bénin 🇧🇯</p>
      </footer>

      {/* Scroll top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Retour en haut"
          style={{
            position: 'fixed', bottom: 26, right: 26, zIndex: 999,
            width: 42, height: 42, borderRadius: 12,
            background: '#fff', border: '1.5px solid #E5E5E5',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(0,0,0,.12)', transition: 'all .2s', color: '#555',
          }}
        >
          <ArrowUp size={17} />
        </button>
      )}
    </div>
  );
}