import useTheme from '../model/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='w-10 h-10 flex items-center justify-center text-2xl 
                 bg-gray-200 dark:bg-[#0F1C2E] dark:text-white text-black 
                 rounded-xl shadow'
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
