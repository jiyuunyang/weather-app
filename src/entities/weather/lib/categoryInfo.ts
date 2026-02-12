export const FORECAST_CATEGORY = {
  POP: { name: '강수확률', unit: '%', desc: '강수 확률' },
  PTY: { name: '강수형태', unit: '-', desc: '코드값 (0~6)' },
  PCP: { name: '1시간 강수량', unit: 'mm', desc: '시간당 강수량' },
  REH: { name: '습도', unit: '%', desc: '상대 습도' },
  SNO: { name: '1시간 신적설', unit: 'cm', desc: '시간당 적설량' },
  SKY: { name: '하늘상태', unit: '-', desc: '코드값 (1~4)' },
  TMP: { name: '1시간 기온', unit: '℃', desc: '시간별 기온' },
  TMN: { name: '일 최저기온', unit: '℃', desc: '금일 최저기온' },
  TMX: { name: '일 최고기온', unit: '℃', desc: '금일 최고기온' },
  UUU: { name: '풍속(동서성분)', unit: 'm/s', desc: 'U 바람 성분' },
  VVV: { name: '풍속(남북성분)', unit: 'm/s', desc: 'V 바람 성분' },
  WAV: { name: '파고', unit: 'm', desc: '파도의 높이' },
  VEC: { name: '풍향', unit: 'deg', desc: '풍향(도)' },
  WSD: { name: '풍속', unit: 'm/s', desc: '풍속 (초속)' },
} as const;

export const NOWCAST_CATEGORY = {
  T1H: { name: '기온', unit: '℃', desc: '현재 기온' },
  RN1: { name: '1시간 강수량', unit: 'mm', desc: '최근 1시간 강수량' },
  UUU: { name: '풍속(동서성분)', unit: 'm/s', desc: 'U 바람 성분' },
  VVV: { name: '풍속(남북성분)', unit: 'm/s', desc: 'V 바람 성분' },
  REH: { name: '습도', unit: '%', desc: '상대 습도' },
  PTY: { name: '강수형태', unit: '-', desc: '코드값 (0~7)' },
  VEC: { name: '풍향', unit: 'deg', desc: '풍향(도)' },
  WSD: { name: '풍속', unit: 'm/s', desc: '풍속 (초속)' },
} as const;
