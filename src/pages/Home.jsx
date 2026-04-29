import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, Code2, Smartphone, Shield, CheckCircle,
  Zap, ArrowUp, Menu, X, Sparkles, Cloud, Database, Palette,
  BarChart3, CreditCard, TrendingUp, ExternalLink, Package
} from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

/* ─── Word slider ─────────────────────────────────────── */
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
      color, display: 'inline-block',
      transition: 'opacity .25s ease, transform .25s ease',
      opacity: out ? 0 : 1,
      transform: out ? 'translateY(10px)' : 'translateY(0)',
    }}>
      {word}
    </span>
  );
}

function LFDLogo({ size = 34 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.26,
      background: 'linear-gradient(135deg,#D4A017,#9E7214)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, boxShadow: '0 4px 14px rgba(200,147,26,.35)'
    }}>
      <Sparkles size={size * 0.5} style={{ color: '#fff' }} />
    </div>
  );
}

/* Couleurs accent selon index */
const ACCENT_COLORS = ['#C8931A','#2563EB','#16A34A','#7C3AED','#DC2626','#0891B2'];

function HeroMock({ dbProducts }) {
  /* Uniquement Firebase + "Prochain Produit" toujours en dernier */
  // Trier les produits par ordre avant de les afficher
  const activeDb = dbProducts
    .filter(p => p.active !== false)
    .sort((a, b) => {
      const orderA = a.order !== undefined ? a.order : 9999;
      const orderB = b.order !== undefined ? b.order : 9999;
      return orderA - orderB;
    });
  
  const allRows = [
    ...activeDb,
    { name: 'Prochain Produit', emoji: '✨', tag: 'Bientôt', coming: true },
  ].slice(0, 5); /* max 5 lignes pour ne pas déborder */

  const liveCount = activeDb.length;

  return (
    <div style={{
      background: '#fff', borderRadius: 20,
      boxShadow: '0 28px 80px rgba(0,0,0,.13)',
      border: '1px solid #F0F0F0',
      padding: 24, width: 310, fontFamily: 'inherit'
    }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#BBB', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 2 }}>Nos produits</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#111', letterSpacing: '-.02em' }}>{liveCount} solution{liveCount > 1 ? 's' : ''} live</div>
        </div>
        <span style={{ background: '#ECFDF5', color: '#15803D', fontSize: 11, fontWeight: 700, padding: '5px 11px', borderRadius: 100 }}>En ligne ✓</span>
      </div>
      {/* mini bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 44, marginBottom: 18 }}>
        {[20,45,30,65,50,80,55,75,60,95,70,88].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: i === 9 ? '#C8931A' : '#F3F3F1' }} />
        ))}
      </div>
      {/* product rows */}
      {allRows.map((p, i) => {
        const accent = p.coming ? '#7C3AED' : (p.accent || ACCENT_COLORS[i % ACCENT_COLORS.length]);
        const badge  = p.coming ? 'Bientôt' : (p.tag || 'En ligne');
        const icon   = p.emoji || (p.coming ? '✨' : '📦');
        return (
          <div key={p.id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < allRows.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{icon}</div>
              <span style={{ fontSize: 12, color: '#444', fontWeight: 600, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: accent, background: `${accent}12`, padding: '2px 8px', borderRadius: 100, flexShrink: 0 }}>{badge}</span>
          </div>
        );
      })}
      <div style={{ marginTop: 14, background: 'linear-gradient(135deg,#C8931A,#9E7214)', color: '#fff', textAlign: 'center', borderRadius: 11, padding: '10px 0', fontSize: 13, fontWeight: 700 }}>
        Découvrir nos produits →
      </div>
    </div>
  );
}

function FloatingBadge({ style, children }) {
  return (
    <div style={{
      position: 'absolute', background: '#fff', borderRadius: 12,
      padding: '8px 14px', boxShadow: '0 8px 28px rgba(0,0,0,.10)',
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: 12, fontWeight: 600, color: '#333', whiteSpace: 'nowrap',
      border: '1px solid #F0F0F0', ...style
    }}>
      {children}
    </div>
  );
}

/* ─── Produits venant UNIQUEMENT de Firebase ─────────────────────────────────── */
const COMING_PRODUCT = { name: 'Prochain Produit', desc: 'Une nouvelle solution innovante en cours de développement. Restez connecté.', icon: Sparkles, link: '#', accent: '#7C3AED', tag: 'Bientôt', coming: true };

/* ─── Carte pour un produit Firebase ─────────────────── */
function FirebaseProductCard({ p }) {
  const accent = '#C8931A';
  const content = (
    <>
      <span style={{
        position: 'absolute', top: 18, right: 18, fontSize: 10, fontWeight: 700,
        padding: '3px 10px', borderRadius: 100,
        background: p.active !== false ? '#ECFDF5' : '#F3F4F6',
        color:      p.active !== false ? '#15803D' : '#6B7280',
      }}>
        {p.active !== false ? 'En ligne' : 'Inactif'}
      </span>
      <div style={{ width: 52, height: 52, borderRadius: 16, background: '#F5E6C0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        {p.emoji && p.emoji.trim()
          ? <span style={{ fontSize: 26, lineHeight: 1 }}>{p.emoji.trim()}</span>
          : <Package size={26} style={{ color: accent }} />
        }
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 10 }}>{p.name}</h3>
      {p.description && <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7, marginBottom: 22 }}>{p.description}</p>}
      {p.category && <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: '#999', background: '#F3F3F1', padding: '3px 10px', borderRadius: 100, marginBottom: 14 }}>{p.category}</span>}
      {p.link && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: accent }}>
          Visiter le site <ExternalLink size={13} />
        </div>
      )}
    </>
  );

  const cardStyle = { background: '#fff', border: '1px solid #EBEBEB', borderRadius: 20, padding: '36px 30px', position: 'relative', display: 'block', transition: 'all .25s', textDecoration: 'none' };

  if (p.link) {
    return <a href={p.link} target="_blank" rel="noopener noreferrer" className="prod-card" style={cardStyle}>{content}</a>;
  }
  return <div className="prod-card" style={cardStyle}>{content}</div>;
}

const SERVICES = [
  { icon: Code2,      title: 'Développement Web',   desc: 'Sites vitrines, applications web, plateformes SaaS sur mesure.' },
  { icon: Smartphone, title: 'Applications Mobiles', desc: 'iOS, Android, cross-platform. Solutions mobiles performantes.' },
  { icon: Cloud,      title: 'Solutions Cloud',      desc: 'Hébergement, déploiement, scalabilité. Infrastructure robuste.' },
  { icon: Database,   title: 'APIs & Backend',       desc: "Conception d'APIs REST, microservices, architectures backend." },
  { icon: Palette,    title: 'Design UI/UX',         desc: 'Interfaces modernes, expérience utilisateur optimale, design pro.' },
  { icon: BarChart3,  title: 'Conseil Technique',    desc: 'Audit, architecture, accompagnement technique personnalisé.' },
];

const TECH = ['React','Vue.js','Node.js','Firebase','Vercel','TailwindCSS','Python','Flutter','MongoDB','PostgreSQL','AWS','Stripe'];
const NAV_LINKS = [['/#products','Produits'],['/#services','Services'],['/#about','À propos'],['/contact','Contact']];

/* ─── Component ─────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop,  setShowTop]  = useState(false);
  const [dbProducts, setDbProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 10); setShowTop(window.scrollY > 500); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Produits Firebase en temps réel avec tri par ordre */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      snap => {
        const productsList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Trier par ordre (les produits sans order vont à la fin)
        productsList.sort((a, b) => {
          const orderA = a.order !== undefined ? a.order : 9999;
          const orderB = b.order !== undefined ? b.order : 9999;
          return orderA - orderB;
        });
        setDbProducts(productsList);
      },
      console.error
    );
    return () => unsub();
  }, []);

  return (
    <div style={{ fontFamily: "'Sora','Plus Jakarta Sans',sans-serif", background: '#FAFAF8', color: '#111', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .ani-1{animation:fadeUp .55s .05s ease both}
        .ani-2{animation:fadeUp .55s .15s ease both}
        .ani-3{animation:fadeUp .55s .25s ease both}
        .ani-4{animation:fadeUp .55s .35s ease both}
        .lfd-float{animation:floatY 4s ease-in-out infinite}
        a{text-decoration:none;color:inherit}
        .nav-link{font-size:14px;font-weight:500;color:#555;transition:color .18s;white-space:nowrap}
        .nav-link:hover{color:#C8931A}
        .btn-gold{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#D4A017,#B07D10);color:#fff;font-weight:700;font-size:14px;padding:12px 26px;border-radius:12px;border:none;cursor:pointer;transition:all .2s;box-shadow:0 4px 18px rgba(200,147,26,.3);text-decoration:none}
        .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(200,147,26,.45)}
        .btn-outline{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#333;font-weight:600;font-size:14px;padding:12px 26px;border-radius:12px;border:1.5px solid #E5E5E5;cursor:pointer;transition:all .2s;text-decoration:none}
        .btn-outline:hover{border-color:#C8931A;color:#C8931A}
        .prod-card{background:#fff;border:1px solid #EBEBEB;border-radius:20px;transition:all .25s;text-decoration:none;display:block}
        .prod-card:hover{box-shadow:0 12px 40px rgba(0,0,0,.08);transform:translateY(-3px);border-color:#DDD}
        .pill{display:inline-flex;align-items:center;gap:5px;background:#F5E6C0;color:#9E7214;font-size:11px;font-weight:700;padding:4px 12px;border-radius:100px;letter-spacing:.05em;text-transform:uppercase}
        .tech-chip{background:#F3F3F1;color:#555;font-size:12px;font-weight:500;padding:7px 16px;border-radius:100px;transition:all .18s;border:1px solid transparent;cursor:default}
        .tech-chip:hover{background:#F5E6C0;color:#9E7214}
        .svc-card{background:#fff;border:1px solid #EBEBEB;border-radius:18px;padding:28px;transition:all .22s}
        .svc-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.07);transform:translateY(-2px)}
        .svc-card:hover .svc-icon{background:#F5E6C0!important}
        .nav-desktop{display:flex}
        .nav-burger{display:none}
        @media(max-width:820px){
          .nav-desktop{display:none!important}
          .nav-burger{display:flex!important}
          .hero-grid{grid-template-columns:1fr!important}
          .hero-visual{display:none!important}
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(250,250,248,0.97)' : '#FAFAF8',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        transition: 'background .3s, border-color .3s',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <LFDLogo size={34} />
            <span style={{ fontWeight: 800, fontSize: 15, color: '#111', whiteSpace: 'nowrap' }}>La Faveur Infinie de Dieu</span>
          </Link>
          <div className="nav-desktop" style={{ alignItems: 'center', gap: 34 }}>
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
          </div>
          <div className="nav-desktop">
            <Link to="/contact" className="btn-gold">Nous contacter <ArrowRight size={15} /></Link>
          </div>
          <button className="nav-burger" onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#333', alignItems: 'center' }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: '#FAFAF8', borderTop: '1px solid #EBEBEB', padding: '14px 28px 22px' }}>
            {NAV_LINKS.map(([href, label], i, arr) => (
              <a key={href} href={href}
                style={{ display: 'block', padding: '13px 0', fontSize: 15, color: '#444', borderBottom: i < arr.length - 1 ? '1px solid #F0F0F0' : 'none' }}
                onClick={() => setMenuOpen(false)}
              >{label}</a>
            ))}
            <Link to="/contact" className="btn-gold" style={{ marginTop: 18, width: '100%', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
              Nous contacter <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ background: 'linear-gradient(155deg,#FFFDF5 0%,#FAFAF8 65%)', borderBottom: '1px solid #EBEBEB' }}>
        <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '118px 32px 90px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div className="ani-1">
            <div className="pill ani-1" style={{ marginBottom: 20, display: 'inline-flex' }}>
              <Zap size={11} /> Solutions numériques innovantes
            </div>
            <h1 style={{ fontSize: 'clamp(36px,4.8vw,64px)', fontWeight: 900, lineHeight: 1.07, letterSpacing: '-.03em', marginBottom: 22, color: '#0A0A0A' }}>
              Nous créons des solutions<br />
              <span style={{ color: '#555' }}>digitales pour </span>
              <WordSlider />
            </h1>
            <p className="ani-2" style={{ fontSize: 17, color: '#666', lineHeight: 1.7, maxWidth: 460, marginBottom: 34 }}>
              La Faveur Infinie de Dieu développe des produits technologiques innovants : passerelle de paiement, application de facturation, et bien plus.
            </p>
            <div className="ani-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              <a href="#products" className="btn-gold" style={{ fontSize: 15, padding: '15px 30px' }}>
                Découvrir nos produits <ArrowRight size={17} />
              </a>
              <Link to="/contact" className="btn-outline" style={{ fontSize: 15, padding: '15px 26px' }}>
                Nous contacter
              </Link>
            </div>
            <div className="ani-4" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {['Qualité garantie', 'Support 24/7', 'Innovation continue'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#888' }}>
                  <CheckCircle size={13} style={{ color: '#16A34A' }} /> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 460 }}>
            <FloatingBadge style={{ top: 22, right: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
              {dbProducts.filter(p => p.active !== false).length} produit{dbProducts.filter(p => p.active !== false).length > 1 ? 's' : ''} en ligne 🚀
            </FloatingBadge>
            <FloatingBadge style={{ top: 185, left: -24 }}>
              <Globe size={13} style={{ color: '#C8931A' }} /> 40+ pays supportés 🌍
            </FloatingBadge>
            <FloatingBadge style={{ bottom: 55, right: -8 }}>
              <Zap size={13} style={{ color: '#7C3AED' }} /> Innovation continue ✨
            </FloatingBadge>
            <div className="lfd-float"><HeroMock dbProducts={dbProducts} /></div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))' }}>
          {[
            { icon: Globe,      val: '40+',  lbl: 'Pays couverts' },
            { icon: CreditCard, val: dbProducts.filter(p => p.active !== false).length, lbl: 'Produits live' },
            { icon: TrendingUp, val: '99.9%',lbl: 'Disponibilité' },
            { icon: Zap,        val: '24/7', lbl: 'Support actif' },
          ].map((s, i, arr) => (
            <div key={i} style={{ padding: '28px 24px', borderRight: i < arr.length - 1 ? '1px solid #EBEBEB' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#F5E6C0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={19} style={{ color: '#C8931A' }} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#111', lineHeight: 1, marginBottom: 3 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>{s.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PRODUITS ══ */}
      <section id="products" style={{ padding: '90px 28px', background: '#F7F7F5', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="pill" style={{ marginBottom: 14, display: 'inline-flex' }}><Zap size={11} /> Nos Produits</div>
            <h2 style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 900, color: '#0A0A0A', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 14 }}>
              Des solutions qui font la différence
            </h2>
            <p style={{ fontSize: 16, color: '#777', maxWidth: 440, margin: '0 auto' }}>
              Chaque produit est conçu avec soin pour répondre aux besoins réels des entreprises.
            </p>
          </div>

          {(() => {
            /* Toute la liste ordonnée : Firebase actifs (déjà triés) + "Prochain" en dernier */
            const activeProducts = dbProducts.filter(p => p.active !== false);
            const dbCards = activeProducts.map(p => ({ key: p.id, type: 'db', data: p }));
            const comingCard = { key: 'coming', type: 'coming', data: COMING_PRODUCT };
            const allCards = [...dbCards, comingCard];
            const visible  = allCards.slice(0, visibleCount);
            const hasMore  = allCards.length > visibleCount;

            return (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 22 }}>
                  {visible.map(({ key, type, data: p }) => {
                    if (type === 'db') return <FirebaseProductCard key={key} p={p} />;
                    /* coming */
                    return (
                      <div key={key} className="prod-card" style={{ padding: '36px 30px', position: 'relative', opacity: 0.82 }}>
                        <span style={{ position: 'absolute', top: 18, right: 18, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: '#EDE9FE', color: '#7C3AED' }}>{p.tag}</span>
                        <div style={{ width: 52, height: 52, borderRadius: 16, background: `${p.accent}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                          <p.icon size={26} style={{ color: p.accent }} />
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 10 }}>{p.name}</h3>
                        <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7, marginBottom: 22 }}>{p.desc}</p>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: p.accent }}>
                          Bientôt disponible <ArrowRight size={14} />
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bouton Suivant */}
                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: 36 }}>
                    <button
                      onClick={() => setVisibleCount(c => c + 12)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: '#fff', border: '1.5px solid #E5E5E5',
                        color: '#555', fontWeight: 600, fontSize: 14,
                        padding: '13px 30px', borderRadius: 12, cursor: 'pointer',
                        transition: 'all .2s', fontFamily: 'inherit',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#C8931A'; e.currentTarget.style.color='#C8931A'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='#E5E5E5'; e.currentTarget.style.color='#555'; }}
                    >
                      Voir plus <ArrowRight size={15} />
                      <span style={{ fontSize: 12, color: '#AAA', fontWeight: 500 }}>
                        ({allCards.length - visibleCount} restant{allCards.length - visibleCount > 1 ? 's' : ''})
                      </span>
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: '90px 28px', background: '#fff', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 900, color: '#0A0A0A', letterSpacing: '-.03em', marginBottom: 12 }}>Nos Services</h2>
            <p style={{ fontSize: 16, color: '#777', maxWidth: 400, margin: '0 auto' }}>De l'idée à la réalisation, nous vous accompagnons à chaque étape.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card">
                <div className="svc-icon" style={{ width: 42, height: 42, borderRadius: 12, background: '#F0F0EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, transition: 'background .2s' }}>
                  <s.icon size={19} style={{ color: '#666' }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH ══ */}
      <section style={{ padding: '60px 28px', background: '#F7F7F5', borderTop: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#BBB', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 22 }}>Technologies utilisées</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {TECH.map(t => <span key={t} className="tech-chip">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding: '90px 28px', background: 'linear-gradient(135deg,#C8931A 0%,#9E7214 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 900, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 16 }}>Un projet en tête ?</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.85)', marginBottom: 36, lineHeight: 1.65 }}>Parlons-en. Nous vous aiderons à le concrétiser.</p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#9E7214', fontWeight: 700, fontSize: 15, padding: '15px 36px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 28px rgba(0,0,0,.15)' }}>
            Contactez-nous <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Retour en haut"
          style={{ position: 'fixed', bottom: 26, right: 26, zIndex: 999, width: 42, height: 42, borderRadius: 12, background: '#fff', border: '1.5px solid #E5E5E5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(0,0,0,.12)', color: '#555' }}>
          <ArrowUp size={17} />
        </button>
      )}
    </div>
  );
}