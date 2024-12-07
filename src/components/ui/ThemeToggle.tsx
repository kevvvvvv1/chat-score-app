import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useThemeStore } from '../../stores/themeStore';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="text-xl" />
    </button>
  );
}