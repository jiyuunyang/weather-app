import useTheme from '@/features/theme-toggle/model/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='relative inline-block group p-1 rounded-full bg-card-background dark:bg-card-background-dark cursor-pointer'
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
      {/* 툴팁 */}
      <div
        className='absolute top-full left-1/2 transform -translate-x-1/2 
                    w-max max-w-xs bg-black text-white text-sm rounded-md px-1 py-0.5 mt-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'
      >
        테마전환
      </div>
    </button>
  );
}
