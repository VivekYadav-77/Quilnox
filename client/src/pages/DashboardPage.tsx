import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-100 p-6 dark:bg-slate-950">
      <section className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
              Welcome, {user?.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Role: {user?.role}
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
