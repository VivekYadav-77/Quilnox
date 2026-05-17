import { AxiosError } from 'axios';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';
import BrandMark from '../components/BrandMark';
import Button from '../components/ui/Button';
import { AlertIcon, ArrowRightIcon } from '../components/ui/Icons';
import { useAuth } from '../hooks/useAuth';
import type { ApiResponse, UserRole } from '../types';

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiResponse<unknown> | undefined;
    return response?.message || response?.errors?.[0] || fallback;
  }

  return fallback;
};

const RegisterPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<UserRole>('sales');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await registerApi({ name, email, password, role });

      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate('/dashboard');
        return;
      }

      setError(response.message || 'Registration failed');
    } catch (caughtError) {
      setError(getErrorMessage(caughtError, 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: 'var(--surface)' }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'var(--accent)' }} />

      <section className="relative w-full max-w-sm animate-slide-up">
        <div className="mb-8 flex justify-center">
          <BrandMark showText />
        </div>

        <div className="app-card p-6 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Create account
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Start managing your team pipeline.
            </p>
          </div>

          {error && (
            <div
              className="mb-5 flex items-center gap-2.5 rounded-lg p-3 text-sm animate-fade-in"
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
              }}
            >
              <AlertIcon className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="label">Name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="input-field"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="label">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="input-field"
                placeholder="you@company.com"
              />
            </label>

            <label className="block">
              <span className="label">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                className="input-field"
                placeholder="Minimum 8 characters"
              />
            </label>

            <label className="block">
              <span className="label">Role</span>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole)}
                className="input-field"
              >
                <option value="sales">Sales User</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <Button type="submit" loading={loading} className="w-full">
              Create account
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Already registered?{' '}
          <Link to="/login" className="font-medium hover:underline" style={{ color: 'var(--accent)' }}>
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
