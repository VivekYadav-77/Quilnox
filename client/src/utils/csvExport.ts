import type { Lead } from '../types';

const CSV_HEADERS = ['Name', 'Email', 'Status', 'Source', 'Created At'];

const escapeCSVField = (value: string): string => {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
};

const formatDate = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const exportLeadsToCSV = (leads: Lead[]): void => {
  if (leads.length === 0) {
    return;
  }

  const rows = leads.map((lead) => [
    escapeCSVField(lead.name),
    escapeCSVField(lead.email),
    escapeCSVField(lead.status),
    escapeCSVField(lead.source),
    escapeCSVField(formatDate(lead.createdAt)),
  ]);

  const csvContent = [
    CSV_HEADERS.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');
  const blob = new Blob([`\uFEFF${csvContent}`], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
