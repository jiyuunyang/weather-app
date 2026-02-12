import { getWeatherEmoji } from '../lib/getWeatherEmoji';

export function WeatherEmoji({
  ptyCode,
  skyCode,
}: {
  ptyCode?: number;
  skyCode?: number;
}) {
  const { emoji } = getWeatherEmoji(ptyCode, skyCode);
  return <span className='text-xl'>{emoji}</span>;
}
