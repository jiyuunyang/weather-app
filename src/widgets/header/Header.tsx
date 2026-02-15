import CurrentLocationButton from '@/widgets/header/CurrentLocationButton';
import SearchInput from '@/widgets/header/SearchInput';
import ThemeToggle from '@/widgets/header/ThemeToggle';

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
        <CurrentLocationButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
