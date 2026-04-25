import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Package, LogOut, Sparkles, ChevronRight, Mail, Lock, Eye, EyeOff, Menu, X } from 'lucide-react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return () => unsub();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Email et mot de passe requis'); return; }
    setLogging(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connecté');
    } catch {
      toast.error('Email ou mot de passe incorrect');
    } finally {
      setLogging(false);
    }
  };

  const handleLogout = async () => { await signOut(auth); navigate('/admin'); };

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  /* ── Login ── */
  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={22} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Administration</h2>
          <p className="text-sm text-gray-500 mt-1">La Faveur Infinie de Dieu</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="admin@lfd.com" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={logging}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50">
            {logging ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );

  const menuItems = [
    { title: 'Dashboard', icon: Layout,  path: '/admin' },
    { title: 'Produits',  icon: Package, path: '/admin/products' },
  ];

  /* ── Sidebar content (réutilisé desktop + mobile) ── */
  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">LFD</span>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}>
              <item.icon size={18} /> {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800 space-y-1">
        <Link to="/" onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
          <ChevronRight size={16} /> Retour au site
        </Link>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all w-full text-left">
          <LogOut size={18} /> Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar desktop (fixe, lg+) ── */}
      <aside className="w-64 bg-gray-900 hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* ── Sidebar mobile (drawer par-dessus) ── */}
      {sidebarOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* drawer */}
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 flex flex-col z-50 lg:hidden">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Contenu principal ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Header — occupe toute la largeur, toujours visible */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-20 gap-3">
          {/* Burger mobile uniquement */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 flex-shrink-0"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-md flex items-center justify-center lg:hidden">
              <Sparkles size={11} className="text-white" />
            </div>
            <h1 className="text-sm font-bold text-gray-900">Administration</h1>
          </div>

          <div className="flex-1" />
          <span className="text-xs text-gray-400 truncate max-w-[160px]">{user?.email}</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}