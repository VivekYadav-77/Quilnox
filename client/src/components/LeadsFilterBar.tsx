import type { LeadSource, LeadStatus, SortOrder } from '../types';
import { CloseIcon, SearchIcon } from './ui/Icons';

interface LeadsFilterBarProps {
  searchInput: string;
  status: LeadStatus | '';
  source: LeadSource | '';
  sort: SortOrder;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LeadStatus | '') => void;
  onSourceChange: (value: LeadSource | '') => void;
  onSortChange: (value: SortOrder) => void;
}

const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const sources: LeadSource[] = ['Website', 'Instagram', 'Referral'];

const LeadsFilterBar = ({
  searchInput,
  status,
  source,
  sort,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onSortChange,
}: LeadsFilterBarProps) => {
  const hasFilters = Boolean(searchInput || status || source || sort !== 'latest');

  return (
    <section className="app-card flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email..."
          className="input-field pl-9 pr-9"
        />
        {searchInput && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="btn-ghost absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            aria-label="Clear search"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex">
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as LeadStatus | '')}
          className="input-field lg:w-36"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={source}
          onChange={(event) => onSourceChange(event.target.value as LeadSource | '')}
          className="input-field lg:w-36"
          aria-label="Filter by source"
        >
          <option value="">All Sources</option>
          {sources.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOrder)}
          className="input-field lg:w-32"
          aria-label="Sort leads"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onStatusChange('');
              onSourceChange('');
              onSortChange('latest');
            }}
            className="btn-ghost text-xs"
            style={{ color: '#fca5a5' }}
          >
            Clear
          </button>
        )}
      </div>
    </section>
  );
};

export default LeadsFilterBar;
