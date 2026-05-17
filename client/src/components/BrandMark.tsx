import { useId } from 'react';

interface BrandMarkProps {
  className?: string;
  showText?: boolean;
}

const BrandMark = ({ className = '', showText = false }: BrandMarkProps) => {
  const backgroundId = `${useId()}-brand-bg`.replace(/:/g, '');
  const routeId = `${useId()}-brand-line`.replace(/:/g, '');

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        className="h-11 w-11 shrink-0"
        viewBox="0 0 64 64"
        role="img"
        aria-label="Quilnox symbol"
      >
        <defs>
          <linearGradient id={backgroundId} x1="8" x2="56" y1="8" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F766E" />
            <stop offset=".58" stopColor="#2563EB" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id={routeId} x1="17" x2="48" y1="45" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A7F3D0" />
            <stop offset=".5" stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#0F172A" />
        <path
          fill={`url(#${backgroundId})`}
          d="M11 16c0-3.314 2.686-6 6-6h30c3.314 0 6 2.686 6 6v7.7c0 1.548-.598 3.035-1.669 4.153L39 40.72V50c0 1.017-.586 1.943-1.505 2.378l-9 4.263C26.75 57.467 24.75 56.194 24.75 54.263V40.72L12.669 27.853A6 6 0 0 1 11 23.7z"
        />
        <path
          fill="#E0F2FE"
          d="M18.9 18.5h26.2c1.321 0 2.018 1.565 1.134 2.547L35.115 33.4a4.6 4.6 0 0 0-1.184 3.078v8.174c0 .57-.315 1.093-.819 1.36l-2.326 1.232c-1.025.543-2.258-.2-2.258-1.361v-9.405A4.6 4.6 0 0 0 27.345 33.4L17.766 21.047c-.884-.982-.187-2.547 1.134-2.547"
        />
        <path
          fill="none"
          stroke={`url(#${routeId})`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4.2"
          d="m18.5 43.5 9.1-8.6 8.2 3.8 10.9-16.2"
        />
        <circle cx="18.5" cy="43.5" r="3.6" fill="#A7F3D0" />
        <circle cx="27.6" cy="34.9" r="3.6" fill="#F8FAFC" />
        <circle cx="35.8" cy="38.7" r="3.6" fill="#F8FAFC" />
        <circle cx="46.7" cy="22.5" r="5.4" fill="#FDE68A" />
        <path
          fill="none"
          stroke="#0F172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          d="m44.2 22.5 1.8 1.8 3.5-4.1"
        />
      </svg>
      {showText && (
        <div>
          <p className="font-display text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            Quilnox
          </p>
          <p className="text-sm leading-tight" style={{ color: 'var(--text-secondary)' }}>
            Lead intelligence
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandMark;
