import Button from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
      <h3 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h3>
      {description && (
        <p className="mt-1 max-w-md text-sm text-slate-600 dark:text-slate-400">
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
