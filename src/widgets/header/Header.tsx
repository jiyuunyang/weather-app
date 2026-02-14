import SearchInput from '@/features/search/ui/SearchInput';
import ThemeToggle from '@/features/theme-toggle/ui/ThemeToggle';

export function Header() {
  return (
    <header className='flex items-center justify-between p-4'>
      {/* Left */}
      <div className='text-xl font-semibold flex items-center gap-2'>
        🇰🇷 한국 날씨정보
      </div>

      {/* Center */}
      <div className='flex-1 flex justify-center'>
        <SearchInput />
      </div>

      {/* Right */}
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
