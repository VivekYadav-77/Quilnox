import { useMemo, useState } from 'react';
import { deleteLeadApi } from '../api/leadsApi';
import LeadsFilterBar from '../components/LeadsFilterBar';
import LeadModal from '../components/LeadModal';
import LeadsTable from '../components/LeadsTable';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import { useAuth } from '../hooks/useAuth';
import { useDebounce } from '../hooks/useDebounce';
import { useLeads } from '../hooks/useLeads';
import type { Lead, LeadFilters, LeadSource, LeadStatus, SortOrder } from '../types';

const LeadsPage = () => {
  const { isAdmin } = useAuth();
  const [searchInput, setSearchInput] = useState<string>('');
  const [status, setStatus] = useState<LeadStatus | ''>('');
  const [source, setSource] = useState<LeadSource | ''>('');
  const [sort, setSort] = useState<SortOrder>('latest');
  const [page, setPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>();
  const [deleteError, setDeleteError] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 300);

  const filters = useMemo<LeadFilters>(
    () => ({
      status,
      source,
      search: debouncedSearch,
      sort,
      page,
      limit: 10,
    }),
    [debouncedSearch, page, sort, source, status]
  );

  const { leads, pagination, loading, error, refetch } = useLeads(filters);

  const openCreateModal = (): void => {
    setEditingLead(undefined);
    setModalOpen(true);
  };

  const handleDelete = async (leadId: string): Promise<void> => {
    if (!window.confirm('Delete this lead?')) return;

    try {
      setDeleteError('');
      await deleteLeadApi(leadId);
      refetch();
    } catch {
      setDeleteError('Failed to delete lead. Please try again.');
    }
  };

  return (
    <div className="space-y-5">
      <LeadsFilterBar
        searchInput={searchInput}
        status={status}
        source={source}
        sort={sort}
        onSearchChange={(value) => {
          setSearchInput(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onSourceChange={(value) => {
          setSource(value);
          setPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}
      />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-slate-950 dark:text-white">
            {pagination ? `${pagination.total} results` : 'Leads'}
          </p>
          <p className="text-sm text-slate-500">Manage and track your pipeline.</p>
        </div>
        <Button type="button" onClick={openCreateModal}>
          Create lead
        </Button>
      </section>

      {(error || deleteError) && (
        <div className="flex items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error || deleteError}</span>
          {error && (
            <Button type="button" variant="secondary" size="sm" onClick={refetch}>
              Retry
            </Button>
          )}
        </div>
      )}

      <LeadsTable
        leads={leads}
        loading={loading}
        onCreate={openCreateModal}
        onEdit={(lead) => {
          setEditingLead(lead);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
        isAdmin={isAdmin}
      />

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lead={editingLead}
        onSuccess={refetch}
      />
    </div>
  );
};

export default LeadsPage;
