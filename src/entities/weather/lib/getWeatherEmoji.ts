import { SKY_EMOJI_MAP, PTY_EMOJI_MAP } from './emojiMaps';
import type { SkyCode, PtyCode, WeatherSymbol } from '../model/types';

export function getWeatherEmoji(
  ptyCode?: number,
  skyCode?: number,
): WeatherSymbol {
  // 1. 강수 없음, SKY 기반
  if (ptyCode === 0) {
    if (skyCode !== undefined) {
      return (
        SKY_EMOJI_MAP[skyCode as SkyCode] ?? { emoji: '❓', desc: '알 수 없음' }
      );
    }
    return { emoji: '☀️', desc: '맑음' };
  }

  // 2. 강수 있음
  if (ptyCode && ptyCode > 0) {
    return (
      PTY_EMOJI_MAP[ptyCode as PtyCode] ?? { emoji: '❓', desc: '알 수 없음' }
    );
  }

  // 3. 알 수 없는 경우
  return { emoji: '❓', desc: '알 수 없음' };
}
