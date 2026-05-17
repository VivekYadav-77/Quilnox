import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowRightIcon, DashboardIcon, PlusIcon, UsersIcon } from '../components/ui/Icons';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();

  const roleLabel = isAdmin ? 'Admin control enabled' : 'Sales workspace active';

  return (
    <div className="space-y-5">
      <section className="app-card overflow-hidden p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-medium uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.08em' }}>
              {roleLabel}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl" style={{ color: 'var(--text-primary)' }}>
              Welcome, {user?.name}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
              Monitor your lead flow, prioritize follow-ups, and keep the pipeline moving from one focused workspace.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button type="button">
                <Link to="/leads" className="inline-flex items-center gap-2">
                  Open leads
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button type="button" variant="secondary">
                <Link to="/leads" className="inline-flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Add lead
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4" style={{ background: 'var(--surface-3)', borderColor: 'var(--border)' }}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Session profile
              </span>
              <span
                className="rounded px-2 py-1 text-xs font-medium capitalize"
                style={
                  isAdmin
                    ? { background: 'rgba(79, 110, 247, 0.15)', color: '#a5b4fc' }
                    : { background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }
                }
              >
                {user?.role}
              </span>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                  User
                </dt>
                <dd className="mt-1 truncate font-medium" style={{ color: 'var(--text-primary)' }}>
                  {user?.name}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                  Email
                </dt>
                <dd className="mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>
                  {user?.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Pipeline', value: 'Lead CRM', icon: UsersIcon },
          { label: 'Access', value: isAdmin ? 'Full CRUD' : 'Own leads', icon: DashboardIcon },
          { label: 'Exports', value: 'CSV ready', icon: ArrowRightIcon },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="app-card-hover p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'var(--surface-3)' }}>
              <Icon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
            </div>
            <p className="text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              {label}
            </p>
            <p className="mt-1 font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {value}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
