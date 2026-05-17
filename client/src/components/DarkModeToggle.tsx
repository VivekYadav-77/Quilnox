import { useTheme } from '../hooks/useTheme';
import Button from './ui/Button';
import { MoonIcon, SunIcon } from './ui/Icons';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="h-9 w-9 p-0"
    >
      {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </Button>
  );
};

export default DarkModeToggle;
