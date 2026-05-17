import Button from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="app-card flex flex-col items-center justify-center border-dashed px-6 py-12 text-center">
      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-md text-sm" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      )}
      {action && (
        <Button type="button" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
