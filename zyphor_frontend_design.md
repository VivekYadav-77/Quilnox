# Quilnox  — Frontend UI Design Guide

## Design Direction

**Aesthetic:** Dark-first, refined industrial — think Bloomberg Terminal meets modern SaaS.
Deep navy/charcoal base, electric accent colors, sharp typography, subtle data-viz energy.
The UI should feel like a serious tool that respects the user's intelligence.

**Fonts:** `Syne` (headings — geometric, authoritative) + `DM Sans` (body — clean, readable)
**Primary accent:** `#4F6EF7` (electric indigo-blue)
**Danger:** `#EF4444`
**Success:** `#10B981`

Install fonts:
```bash
# In index.html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## Global CSS Variables

`src/index.css` — paste this at the top, before Tailwind directives:

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --accent: #4F6EF7;
  --accent-dim: #3B55D4;
  --accent-glow: rgba(79, 110, 247, 0.25);
  --surface: #0F1117;
  --surface-2: #161B27;
  --surface-3: #1E2535;
  --surface-4: #252D3D;
  --border: rgba(255, 255, 255, 0.07);
  --border-hover: rgba(255, 255, 255, 0.14);
  --text-primary: #F0F4FF;
  --text-secondary: #8892A4;
  --text-muted: #4B5568;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--surface);
  color: var(--text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--surface-2); }
::-webkit-scrollbar-thumb { background: var(--surface-4); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

/* Selection color */
::selection { background: var(--accent-glow); color: var(--text-primary); }

@layer components {
  .card {
    @apply rounded-xl border;
    background: var(--surface-2);
    border-color: var(--border);
  }

  .card-hover {
    @apply card transition-all duration-200;
  }
  .card-hover:hover {
    border-color: var(--border-hover);
    box-shadow: 0 0 0 1px var(--border-hover), 0 8px 32px rgba(0,0,0,0.4);
    transform: translateY(-1px);
  }

  .btn-primary {
    @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150;
    background: var(--accent);
    color: white;
  }
  .btn-primary:hover {
    background: var(--accent-dim);
    box-shadow: 0 0 20px var(--accent-glow);
  }
  .btn-primary:active { transform: scale(0.98); }

  .btn-secondary {
    @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150;
    background: var(--surface-3);
    color: var(--text-secondary);
    border: 1px solid var(--border);
  }
  .btn-secondary:hover {
    background: var(--surface-4);
    color: var(--text-primary);
    border-color: var(--border-hover);
  }

  .btn-ghost {
    @apply inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-150;
    color: var(--text-secondary);
  }
  .btn-ghost:hover {
    background: var(--surface-3);
    color: var(--text-primary);
  }

  .btn-danger {
    @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150;
    background: rgba(239, 68, 68, 0.12);
    color: var(--danger);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
  .btn-danger:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.4);
  }

  .input-field {
    @apply w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150;
    background: var(--surface-3);
    border: 1px solid var(--border);
    color: var(--text-primary);
  }
  .input-field::placeholder { color: var(--text-muted); }
  .input-field:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .label {
    @apply block text-xs font-medium mb-1.5;
    color: var(--text-secondary);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
}
```

---

## Tailwind Config Update

`tailwind.config.js`:
```js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        accent: '#4F6EF7',
        surface: {
          DEFAULT: '#0F1117',
          2: '#161B27',
          3: '#1E2535',
          4: '#252D3D',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
```

---

## Layout Component

`src/components/Layout.tsx`:
```tsx
import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, LogOut, Menu, X, Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/leads',     icon: Users,           label: 'Leads'     },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const Sidebar = () => (
    <aside
      className="flex flex-col h-full"
      style={{ background: 'var(--surface-2)', borderRight: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--accent)' }}
        >
          <Zap size={16} color="white" fill="white" />
        </div>
        <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Zyphor
        </span>
      </div>

      <div className="px-3 mb-2">
        <p className="text-xs px-2 mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Navigation
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'text-white'
                  : 'hover:bg-[var(--surface-3)]'
              }`
            }
            style={({ isActive }) => isActive ? {
              background: 'rgba(79,110,247,0.15)',
              color: '#818CF8',
              boxShadow: 'inset 2px 0 0 var(--accent)',
            } : { color: 'var(--text-secondary)' }}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-3 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg mb-1"
          style={{ background: 'var(--surface-3)' }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
              {user?.name}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
              {user?.email}
            </p>
          </div>
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0"
            style={user?.role === 'admin'
              ? { background: 'rgba(79,110,247,0.15)', color: '#818CF8' }
              : { background: 'rgba(16,185,129,0.12)', color: '#34D399' }
            }
          >
            {user?.role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="btn-ghost w-full justify-start text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--surface)' }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-56 flex-shrink-0 flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-56 flex flex-col z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}
        >
          <button
            className="md:hidden btn-ghost p-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          <div className="flex-1" />
          {/* Add DarkModeToggle here in Phase 6 */}
        </header>

        <main className="flex-1 overflow-y-auto p-5 md:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## Login Page

`src/pages/LoginPage.tsx`:
```tsx
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginApi } from '../api/authApi';
import { Zap, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      if (res.success && res.data) {
        login(res.data.user, res.data.token);
        navigate('/dashboard');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--surface)' }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.4,
        }}
      />

      {/* Glow blob */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(79,110,247,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2.5 mb-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--accent)', boxShadow: '0 0 20px var(--accent-glow)' }}
            >
              <Zap size={18} color="white" fill="white" />
            </div>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Zyphor
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Sign in to your workspace
          </p>
        </div>

        {/* Card */}
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          {error && (
            <div
              className="flex items-center gap-2.5 p-3 rounded-lg mb-5 text-sm animate-fade-in"
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                color: '#FCA5A5',
              }}
            >
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
              style={loading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
            >
              {loading ? (
                <>
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: 'var(--text-muted)' }}>
          No account?{' '}
          <Link to="/register" style={{ color: 'var(--accent)' }} className="hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
```

---

## Status & Source Badge Component

`src/components/ui/Badge.tsx`:
```tsx
import { LeadStatus, LeadSource } from '../../types';

const STATUS_STYLES: Record<LeadStatus, { bg: string; color: string; dot: string }> = {
  New:        { bg: 'rgba(79,110,247,0.12)',  color: '#818CF8', dot: '#4F6EF7' },
  Contacted:  { bg: 'rgba(245,158,11,0.12)',  color: '#FCD34D', dot: '#F59E0B' },
  Qualified:  { bg: 'rgba(16,185,129,0.12)',  color: '#34D399', dot: '#10B981' },
  Lost:       { bg: 'rgba(239,68,68,0.10)',   color: '#FCA5A5', dot: '#EF4444' },
};

const SOURCE_STYLES: Record<LeadSource, { bg: string; color: string }> = {
  Website:   { bg: 'rgba(139,92,246,0.12)', color: '#A78BFA' },
  Instagram: { bg: 'rgba(236,72,153,0.12)', color: '#F472B6' },
  Referral:  { bg: 'rgba(20,184,166,0.12)', color: '#2DD4BF' },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
        style={{ background: s.dot }}
      />
      {status}
    </span>
  );
}

export function SourceBadge({ source }: { source: LeadSource }) {
  const s = SOURCE_STYLES[source];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {source}
    </span>
  );
}
```

---

## Skeleton Loader (Table Rows)

`src/components/ui/SkeletonRow.tsx`:
```tsx
export default function SkeletonRow() {
  return (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
      {[140, 180, 80, 80, 90, 60].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className="h-3.5 rounded"
            style={{
              width: w,
              background: 'linear-gradient(90deg, var(--surface-3) 25%, var(--surface-4) 50%, var(--surface-3) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              animationDelay: `${i * 80}ms`,
            }}
          />
        </td>
      ))}
    </tr>
  );
}
```

---

## Leads Table

`src/components/LeadsTable.tsx`:
```tsx
import { Lead } from '../types';
import { StatusBadge, SourceBadge } from './ui/Badge';
import SkeletonRow from './ui/SkeletonRow';
import { Pencil, Trash2, Inbox } from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export default function LeadsTable({ leads, loading, onEdit, onDelete, isAdmin }: LeadsTableProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
            {['Name', 'Email', 'Status', 'Source', 'Created', ''].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : leads.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-20 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--surface-3)' }}
                  >
                    <Inbox size={20} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>No leads found</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      Try adjusting your filters
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            leads.map((lead, i) => (
              <tr
                key={lead._id}
                className="group transition-colors duration-100"
                style={{
                  borderBottom: '1px solid var(--border)',
                  animationDelay: `${i * 30}ms`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3.5">
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {lead.name}
                  </span>
                </td>
                <td className="px-4 py-3.5" style={{ color: 'var(--text-secondary)' }}>
                  {lead.email}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3.5">
                  <SourceBadge source={lead.source} />
                </td>
                <td className="px-4 py-3.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(lead)}
                      className="btn-ghost p-1.5 rounded"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => onDelete(lead._id)}
                        className="p-1.5 rounded transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Pagination Component

`src/components/ui/Pagination.tsx`:
```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, total, limit, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Showing <span style={{ color: 'var(--text-secondary)' }}>{from}–{to}</span> of{' '}
        <span style={{ color: 'var(--text-secondary)' }}>{total}</span> leads
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="btn-secondary p-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
        </button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className="w-8 h-8 rounded-lg text-xs font-medium transition-all"
              style={
                p === page
                  ? { background: 'var(--accent)', color: 'white' }
                  : { color: 'var(--text-secondary)', background: 'var(--surface-3)' }
              }
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="btn-secondary p-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
```

---

## Modal Component

`src/components/ui/Modal.tsx`:
```tsx
import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-md rounded-2xl p-6 animate-slide-up"
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-bold text-base"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="btn-ghost p-1.5"
          >
            <X size={15} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
```

---

## Lead Form Component

`src/components/LeadForm.tsx`:
```tsx
import { useState, FormEvent } from 'react';
import { LeadFormData, LeadStatus, LeadSource } from '../types';

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral'];

interface LeadFormProps {
  initialData?: Partial<LeadFormData>;
  onSubmit: (data: LeadFormData) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

export default function LeadForm({ initialData, onSubmit, loading, submitLabel }: LeadFormProps) {
  const [name, setName]     = useState(initialData?.name   || '');
  const [email, setEmail]   = useState(initialData?.email  || '');
  const [status, setStatus] = useState<LeadStatus>(initialData?.status || 'New');
  const [source, setSource] = useState<LeadSource>(initialData?.source || 'Website');
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadFormData, boolean>>>({});

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Name is required';
    else if (name.length > 100) e.name = 'Name too long';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, status: true, source: true });
    if (!validate()) return;
    await onSubmit({ name, email, status, source });
  };

  const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && (
        <p className="mt-1 text-xs" style={{ color: 'var(--danger)' }}>{error}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Name" error={touched.name ? errors.name : undefined}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, name: true }))}
          className="input-field"
          placeholder="Jane Doe"
          style={touched.name && errors.name ? { borderColor: 'var(--danger)' } : {}}
        />
      </Field>

      <Field label="Email" error={touched.email ? errors.email : undefined}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
          className="input-field"
          placeholder="jane@company.com"
          style={touched.email && errors.email ? { borderColor: 'var(--danger)' } : {}}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Status">
          <select
            value={status}
            onChange={e => setStatus(e.target.value as LeadStatus)}
            className="input-field"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Source">
          <select
            value={source}
            onChange={e => setSource(e.target.value as LeadSource)}
            className="input-field"
          >
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center mt-2"
        style={loading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
      >
        {loading ? (
          <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : submitLabel}
      </button>
    </form>
  );
}
```

---

## Filter Bar

`src/components/LeadsFilterBar.tsx`:
```tsx
import { Search, X } from 'lucide-react';
import { LeadStatus, LeadSource, SortOrder } from '../types';

interface FilterBarProps {
  search: string;
  status: LeadStatus | '';
  source: LeadSource | '';
  sort: SortOrder;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: LeadStatus | '') => void;
  onSourceChange: (v: LeadSource | '') => void;
  onSortChange: (v: SortOrder) => void;
}

export default function LeadsFilterBar({
  search, status, source, sort,
  onSearchChange, onStatusChange, onSourceChange, onSortChange,
}: FilterBarProps) {
  const hasFilters = search || status || source || sort !== 'latest';

  const selectClass = `input-field text-sm`;

  return (
    <div
      className="flex flex-wrap items-center gap-2 p-3 rounded-xl mb-4"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
    >
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search by name or email..."
          className="input-field pl-8 text-sm"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 btn-ghost p-0.5"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={e => onStatusChange(e.target.value as LeadStatus | '')}
        className={selectClass}
        style={{ width: 130 }}
      >
        <option value="">All Statuses</option>
        {['New', 'Contacted', 'Qualified', 'Lost'].map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Source */}
      <select
        value={source}
        onChange={e => onSourceChange(e.target.value as LeadSource | '')}
        className={selectClass}
        style={{ width: 130 }}
      >
        <option value="">All Sources</option>
        {['Website', 'Instagram', 'Referral'].map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={e => onSortChange(e.target.value as SortOrder)}
        className={selectClass}
        style={{ width: 110 }}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={() => {
            onSearchChange('');
            onStatusChange('');
            onSourceChange('');
            onSortChange('latest');
          }}
          className="btn-ghost text-xs px-2"
          style={{ color: 'var(--danger)' }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
```

---

## Install Lucide Icons

```bash
cd client && npm install lucide-react
```

All icons used in this guide come from `lucide-react` — no icon library conflicts.

---

## Summary of Design Decisions

| Decision | Reason |
|---|---|
| Dark-first theme | Sales dashboards are used for long hours — dark reduces eye strain and looks professional |
| CSS variables over Tailwind colors | Allows runtime theming and keeps color logic centralized |
| Syne + DM Sans | Syne gives authority to headings, DM Sans keeps body text readable at small sizes |
| Skeleton rows instead of spinner | Table spinners cause layout shift; skeletons maintain table structure during load |
| Hover-reveal action buttons | Keeps rows clean; actions appear on demand — reduces visual noise |
| Animated pulsing dot on status badges | Adds subtle life to the UI without being distracting |
| Accent glow on primary button hover | Reinforces the electric blue accent as the primary action signal |
