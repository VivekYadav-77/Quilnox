import DarkModeToggle from './DarkModeToggle';
import Button from './ui/Button';
import { MenuIcon } from './ui/Icons';

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
}

const TopBar = ({ title, onMenuClick }: TopBarProps) => {
  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 lg:px-6"
      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <h1 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h1>
      </div>
      <DarkModeToggle />
    </header>
  );
};

export default TopBar;
