import { useCallback, useEffect, useState } from 'react';
import { fetchLeads } from '../api/leadsApi';
import type { Lead, LeadFilters, PaginationMeta } from '../types';

interface UseLeadsReturn {
  leads: Lead[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useLeads = (filters: LeadFilters): UseLeadsReturn => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  const refetch = useCallback((): void => {
    setTrigger((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadLeads = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchLeads(filters);

        if (!cancelled) {
          setLeads(response.data);
          setPagination(response.pagination);
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load leads. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadLeads();

    return () => {
      cancelled = true;
    };
  }, [filters, trigger]);

  return { leads, pagination, loading, error, refetch };
};
