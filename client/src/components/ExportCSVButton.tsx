import type { Lead } from '../types';
import { exportLeadsToCSV } from '../utils/csvExport';
import Button from './ui/Button';

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
      Export CSV ({leads.length})
    </Button>
  );
};

export default ExportCSVButton;
