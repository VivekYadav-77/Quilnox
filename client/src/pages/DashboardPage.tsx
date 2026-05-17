import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
        Welcome, {user?.name}
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        You are signed in as {isAdmin ? 'an admin' : 'a sales user'}. Continue to
        the leads workspace to manage your pipeline.
      </p>
      <Button type="button" className="mt-5">
        <Link to="/leads">Open leads</Link>
      </Button>
    </section>
  );
};

export default DashboardPage;
