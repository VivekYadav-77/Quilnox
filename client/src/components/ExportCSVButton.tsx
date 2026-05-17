import type { Lead } from '../types';
import { exportLeadsToCSV } from '../utils/csvExport';
import Button from './ui/Button';
import { DownloadIcon } from './ui/Icons';

interface ExportCSVButtonProps {
  leads: Lead[];
  disabled?: boolean;
}

const ExportCSVButton = ({ leads, disabled = false }: ExportCSVButtonProps) => {
  return (
    <Button
      type="button"
      variant="secondary"
      disabled={disabled || leads.length === 0}
      onClick={() => exportLeadsToCSV(leads)}
    >
      <DownloadIcon className="h-4 w-4" />
      Export CSV ({leads.length})
    </Button>
  );
};

export default ExportCSVButton;
