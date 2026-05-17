import { DashboardIcon, UserIcon, UsersIcon } from '../components/ui/Icons';

const photoPath = '/about/Vivek.png';

const AboutPage = () => {
  return (
    <div className="space-y-5">
      <section className="app-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
          <div className="border-b p-6 lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--border)' }}>
            <div
              className="aspect-[4/5] overflow-hidden rounded-lg border"
              style={{ background: 'var(--surface-3)', borderColor: 'var(--border-hover)' }}
            >
              <img
                src={photoPath}
                alt="Quilnox creator profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="mb-8">
              <p className="mb-3 text-xs font-medium uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.08em' }}>
                Project identity
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl" style={{ color: 'var(--text-primary)' }}>
                About Quilnox
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                Quilnox is a full-stack lead management dashboard designed for focused sales teams. It brings lead tracking,
                role-aware actions, filtering, pagination, and CSV exports into a compact workspace built for daily pipeline work.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: DashboardIcon,
                  label: 'Purpose',
                  text: 'Turn raw lead records into a clear operational workspace.',
                },
                {
                  icon: UsersIcon,
                  label: 'Users',
                  text: 'Supports admin and sales users with role-aware permissions.',
                },
                {
                  icon: UserIcon,
                  label: 'Creator',
                  text: 'Personal profile and project identity for the creator behind Quilnox.',
                },
              ].map(({ icon: Icon, label, text }) => (
                <div key={label} className="app-card-hover p-4">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'var(--surface-3)' }}>
                    <Icon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <p className="text-xs uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Brand System
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              The custom Quilnox symbol is used across the app, favicon, and README.
            </p>
          </div>
          <img src="/brand-mark.svg" alt="Quilnox symbol" className="h-16 w-16 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
