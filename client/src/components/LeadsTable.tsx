import type { Lead } from '../types';
import { useRBAC } from '../hooks/useRBAC';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { EditIcon, InboxIcon, PlusIcon, TrashIcon } from './ui/Icons';
import SkeletonRow from './ui/SkeletonRow';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onCreate: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
}

const formatDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

const LeadsTable = ({
  leads,
  loading,
  onCreate,
  onEdit,
  onDelete,
}: LeadsTableProps) => {
  const { canEdit, canDelete } = useRBAC();

  return (
    <div className="app-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Email', 'Status', 'Source', 'Created', ''].map((heading) => (
                <th
                  key={heading || 'actions'}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }, (_item, index) => <SkeletonRow key={index} />)
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'var(--surface-3)' }}>
                      <InboxIcon className="h-6 w-6" style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                        No leads found
                      </p>
                      <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        Create a lead or adjust the filters.
                      </p>
                    </div>
                    <Button type="button" size="sm" onClick={onCreate}>
                      <PlusIcon className="h-4 w-4" />
                      Create lead
                    </Button>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr
                  key={lead._id}
                  className="group animate-fade-in transition-colors duration-150 hover:bg-[var(--surface-3)]"
                  style={{
                    borderBottom: '1px solid var(--border)',
                    animationDelay: `${index * 24}ms`,
                  }}
                >
                  <td className="whitespace-nowrap px-4 py-4">
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {lead.name}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4" style={{ color: 'var(--text-secondary)' }}>
                    {lead.email}
                  </td>
                  <td className="px-4 py-4">
                    <Badge label={lead.status} variant="status" value={lead.status} />
                  </td>
                  <td className="px-4 py-4">
                    <Badge label={lead.source} variant="source" value={lead.source} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                      {canEdit(lead) && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onEdit(lead)}
                          aria-label={`Edit ${lead.name}`}
                          title="Edit"
                        >
                          <EditIcon className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:text-red-300"
                          onClick={() => onDelete(lead._id)}
                          aria-label={`Delete ${lead.name}`}
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
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
