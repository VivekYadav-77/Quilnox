import { useTheme } from '../hooks/useTheme';
import Button from './ui/Button';

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
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  );
};

export default DarkModeToggle;
