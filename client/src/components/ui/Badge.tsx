import type { LeadSource, LeadStatus } from '../../types';

interface BadgeProps {
  label: string;
  variant: 'status' | 'source';
  value: string;
}

const statusStyles: Record<LeadStatus, { bg: string; color: string; dot: string }> = {
  New: { bg: 'rgba(79, 110, 247, 0.12)', color: '#a5b4fc', dot: '#4f6ef7' },
  Contacted: { bg: 'rgba(245, 158, 11, 0.12)', color: '#fcd34d', dot: '#f59e0b' },
  Qualified: { bg: 'rgba(16, 185, 129, 0.12)', color: '#34d399', dot: '#10b981' },
  Lost: { bg: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', dot: '#ef4444' },
};

const sourceStyles: Record<LeadSource, { bg: string; color: string }> = {
  Website: { bg: 'rgba(139, 92, 246, 0.12)', color: '#c4b5fd' },
  Instagram: { bg: 'rgba(236, 72, 153, 0.12)', color: '#f9a8d4' },
  Referral: { bg: 'rgba(20, 184, 166, 0.12)', color: '#5eead4' },
};

const Badge = ({ label, variant, value }: BadgeProps) => {
  if (variant === 'status') {
    const style = statusStyles[value as LeadStatus] || statusStyles.New;

    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
        style={{ background: style.bg, color: style.color }}
      >
        <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: style.dot }} />
        {label}
      </span>
    );
  }

  const style = sourceStyles[value as LeadSource] || sourceStyles.Website;

  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: style.bg, color: style.color }}
    >
      {label}
    </span>
  );
};

export default Badge;
