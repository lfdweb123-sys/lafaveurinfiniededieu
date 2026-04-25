import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Package, LogOut, Sparkles, ChevronRight } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: Layout, path: '/admin' },
    { title: 'Produits', icon: Package, path: '/admin/products' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm">LFD Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-gold-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                <Icon size={18} /> {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
            <ChevronRight size={16} /> Retour au site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 lg:ml-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-20">
          <h1 className="text-lg font-bold text-gray-900">Administration</h1>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}