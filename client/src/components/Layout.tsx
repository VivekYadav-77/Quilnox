import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import BrandMark from './BrandMark';
import Button from './ui/Button';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Leads', to: '/leads' },
];

const getTitle = (pathname: string): string => {
  if (pathname.startsWith('/leads')) return 'Leads';
  return 'Dashboard';
};

const roleBadgeClass = (role: string | undefined): string => {
  return role === 'admin'
    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200'
    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200';
};

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-8">
        <BrandMark showText />
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <p className="font-medium text-slate-950 dark:text-white">{user?.name}</p>
          <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${roleBadgeClass(user?.role)}`}>
            {user?.role}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
        <Button type="button" variant="secondary" className="mt-3 w-full" onClick={logout}>
          Logout
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="hidden lg:fixed lg:inset-y-0 lg:block">{sidebar}</div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
          <div className="relative h-full">{sidebar}</div>
        </div>
      )}
      <div className="lg:pl-72">
        <TopBar title={getTitle(location.pathname)} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
