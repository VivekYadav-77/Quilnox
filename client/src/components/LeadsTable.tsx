import type { Lead } from '../types';
import { useRBAC } from '../hooks/useRBAC';
import Badge from './ui/Badge';
import Button from './ui/Button';
import EmptyState from './ui/EmptyState';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onCreate: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
}

const formatDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const SkeletonRows = () => (
  <>
    {Array.from({ length: 5 }, (_, index) => (
      <tr key={index} className="animate-pulse border-t border-slate-200 dark:border-slate-800">
        {Array.from({ length: 6 }, (_item, cellIndex) => (
          <td key={cellIndex} className="px-4 py-4">
            <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

const LeadsTable = ({
  leads,
  loading,
  onCreate,
  onEdit,
  onDelete,
}: LeadsTableProps) => {
  const { canEdit, canDelete } = useRBAC();

  if (!loading && leads.length === 0) {
    return (
      <EmptyState
        title="No leads found"
        description="Create a lead or adjust the filters to see results."
        action={{ label: 'Create lead', onClick: onCreate }}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              {['Name', 'Email', 'Status', 'Source', 'Created At', 'Actions'].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              <SkeletonRows />
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-950 dark:text-white">
                    {lead.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-600 dark:text-slate-300">
                    {lead.email}
                  </td>
                  <td className="px-4 py-4">
                    <Badge label={lead.status} variant="status" value={lead.status} />
                  </td>
                  <td className="px-4 py-4">
                    <Badge label={lead.source} variant="source" value={lead.source} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {canEdit(lead) && (
                        <Button type="button" variant="secondary" size="sm" onClick={() => onEdit(lead)}>
                          Edit
                        </Button>
                      )}
                      {canDelete && (
                        <Button type="button" variant="danger" size="sm" onClick={() => onDelete(lead._id)}>
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
