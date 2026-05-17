import type { LeadSource, LeadStatus, SortOrder } from '../types';
import Select from './ui/Select';

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

const statusOptions = ['New', 'Contacted', 'Qualified', 'Lost'].map((value) => ({
  value,
  label: value,
}));

const sourceOptions = ['Website', 'Instagram', 'Referral'].map((value) => ({
  value,
  label: value,
}));

const sortOptions = [
  { value: 'latest', label: 'Latest first' },
  { value: 'oldest', label: 'Oldest first' },
];

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
  return (
    <section className="grid gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 md:grid-cols-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Search
        </span>
        <input
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Name or email"
          className="mt-1 block w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <Select
        label="Status"
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as LeadStatus | '')}
        placeholder="All statuses"
      />
      <Select
        label="Source"
        value={source}
        options={sourceOptions}
        onChange={(value) => onSourceChange(value as LeadSource | '')}
        placeholder="All sources"
      />
      <Select
        label="Sort"
        value={sort}
        options={sortOptions}
        onChange={(value) => onSortChange(value as SortOrder)}
      />
    </section>
  );
};

export default LeadsFilterBar;
