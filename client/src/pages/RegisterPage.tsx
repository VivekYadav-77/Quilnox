import { AxiosError } from 'axios';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';
import BrandMark from '../components/BrandMark';
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
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <BrandMark showText className="mb-6" />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
            Create account
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Start managing leads with your team.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Your name"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              className="mt-1 block w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Minimum 8 characters"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Role
            </span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="mt-1 block w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="sales">Sales User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
