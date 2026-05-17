import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import BrandMark from './BrandMark';
import DarkModeToggle from './DarkModeToggle';
import Button from './ui/Button';
import { DashboardIcon, LogoutIcon, MenuIcon, UserIcon, UsersIcon } from './ui/Icons';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: DashboardIcon },
  { label: 'Leads', to: '/leads', icon: UsersIcon },
  { label: 'About Us', to: '/about', icon: UserIcon },
];

const getTitle = (pathname: string): string => {
  if (pathname.startsWith('/leads')) return 'Leads Workspace';
  if (pathname.startsWith('/about')) return 'About Us';
  return 'Command Overview';
};

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U';

  const sidebar = (
    <aside className="flex h-full w-60 flex-col border-r" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
      <div className="px-5 py-5">
        <BrandMark showText />
      </div>

      <div className="px-5 pb-2 pt-1">
        <p className="text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          Navigation
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map(({ icon: Icon, ...item }) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(79, 110, 247, 0.15)',
                    boxShadow: 'inset 2px 0 0 var(--accent)',
                    color: '#a5b4fc',
                  }
                : { color: 'var(--text-secondary)' }
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mb-2 flex items-center gap-3 rounded-lg px-2 py-2" style={{ background: 'var(--surface-3)' }}>
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: 'var(--accent)' }}
          >
            {userInitial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {user?.name}
            </p>
            <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
              {user?.email}
            </p>
          </div>
          <span
            className="shrink-0 rounded px-1.5 py-0.5 text-xs font-medium capitalize"
            style={
              user?.role === 'admin'
                ? { background: 'rgba(79, 110, 247, 0.15)', color: '#a5b4fc' }
                : { background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }
            }
          >
            {user?.role}
          </span>
        </div>
        <Button type="button" variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
          <LogoutIcon className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--surface)' }}>
      <div className="hidden shrink-0 md:block">{sidebar}</div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
          <div className="relative z-50 h-full">{sidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header
          className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-6"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                {getTitle(location.pathname)}
              </h1>
              <p className="hidden text-xs sm:block" style={{ color: 'var(--text-muted)' }}>
                Quilnox lead operations and pipeline control
              </p>
            </div>
          </div>
          <DarkModeToggle />
        </header>

        <main className="flex-1 overflow-y-auto p-4 animate-fade-in md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
