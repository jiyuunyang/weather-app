import useTheme from '../model/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='p-1 rounded-full bg-card-background dark:bg-card-background-dark'
    >
      {theme === 'dark' ? (
        <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 2a10 10 0 0 1 0 20v-20z' />
        </svg>
      ) : (
        <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 2a10 10 0 0 0 0 20v-20z' />
        </svg>
      )}
    </button>
  );
}
