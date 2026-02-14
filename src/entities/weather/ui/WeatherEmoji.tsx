import { getWeatherEmoji } from '../lib/getWeatherEmoji';

export function WeatherEmoji({
  ptyCode,
  skyCode,
}: {
  ptyCode?: number;
  skyCode?: number;
  rehNumber?: number;
}) {
  const { emoji, desc } = getWeatherEmoji(ptyCode, skyCode);
  return (
    <div className='relative inline-block group cursor-pointer text-2xl'>
      {/* 이모지 */}
      <span>{emoji}</span>

      {/* 툴팁 */}
      <div
        className='absolute bottom-full left-1/2 transform -translate-x-1/2 
                    w-max max-w-xs bg-black text-white text-sm rounded-md px-1 py-0.5 -mb-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'
      >
        {desc}
      </div>
    </div>
  );
}
