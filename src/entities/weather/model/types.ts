export type SkyCode = 1 | 3 | 4;
export type PtyCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ForecastByTime {
  fcstTime: string; // "1200", "1300" ...
  data: Record<string, string>; // { TMP: "4", SKY: "3", PTY: "0" … }
}

export interface UltraShortNowcastResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: UltraShortNowcastItem[];
      };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

export interface UltraShortNowcastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

export interface ShortTermForecastResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: ShortTermForecastItem[];
      };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

export interface ShortTermForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}
