import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const iconProps = (props: IconProps) => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 2,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  ...props,
});

export const DashboardIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <rect x="3" y="3" width="7" height="8" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="15" width="7" height="6" rx="1.5" />
  </svg>
);

export const UsersIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const UserIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

export const LogoutIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const DownloadIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

export const EditIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const TrashIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v5M14 11v5" />
  </svg>
);

export const InboxIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="m5.45 5.11-3.02 6.04A2 2 0 0 0 2.24 12v6A2 2 0 0 0 4 20h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-.21-.89l-3.24-6.48A2 2 0 0 0 16.76 3H7.24a2 2 0 0 0-1.79 1.11Z" />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const AlertIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export const SunIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const MoonIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="M20.99 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 20.99 12.79Z" />
  </svg>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...iconProps(props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
