interface BadgeProps {
  label: string;
  variant: 'status' | 'source';
  value: string;
}

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-800',
  Qualified: 'bg-green-100 text-green-700',
  Lost: 'bg-red-100 text-red-700',
};

const sourceColors: Record<string, string> = {
  Website: 'bg-purple-100 text-purple-700',
  Instagram: 'bg-pink-100 text-pink-700',
  Referral: 'bg-teal-100 text-teal-700',
};

const Badge = ({ label, variant, value }: BadgeProps) => {
  const colors = variant === 'status' ? statusColors : sourceColors;

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${colors[value] || 'bg-slate-100 text-slate-700'}`}>
      {label}
    </span>
  );
};

export default Badge;
