import type { SkyCode, PtyCode } from '../model/types';

// 하늘상태 코드
export const SKY_EMOJI_MAP: Record<SkyCode, { emoji: string; desc: string }> = {
  1: { emoji: '☀️', desc: '맑음' },
  3: { emoji: '⛅', desc: '구름많음' },
  4: { emoji: '☁️', desc: '흐림' },
};

// 강수형태 코드
export const PTY_EMOJI_MAP: Record<PtyCode, { emoji: string; desc: string }> = {
  0: { emoji: '☀️', desc: '없음' },
  1: { emoji: '🌧️', desc: '비' },
  2: { emoji: '🌧️❄️', desc: '비/눈' },
  3: { emoji: '❄️', desc: '눈' },
  4: { emoji: '☔️', desc: '소나기' },
  5: { emoji: '🌦️', desc: '빗방울' },
  6: { emoji: '🌨️', desc: '빗방울눈날림' },
  7: { emoji: '☃️', desc: '눈날림' },
};
