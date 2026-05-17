import Button from './ui/Button';

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
}

const TopBar = ({ title, onMenuClick }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          Menu
        </Button>
        <h1 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h1>
      </div>
      <span className="text-sm text-slate-500">Dark mode in Phase 6</span>
    </header>
  );
};

export default TopBar;
