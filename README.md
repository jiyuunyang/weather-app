# 🌤️ Weather App – 한국 날씨 정보 서비스

한국 기상청 단기예보 API를 이용해 **현재 위치 기반 날씨 확인**, **지역 검색**, **즐겨찾기 관리**, **테마 전환** 기능을 제공하는 웹 서비스입니다.  
브라우저에서 간단히 현재 지역의 날씨를 빠르게 확인할 수 있도록 제작되었습니다.
배포된 서비스는 해당 [링크](https://weather-app-zeta-ten-87.vercel.app/)를 통해 접근할 수 있습니다.

> PC 화면

<img width="790" height="653" alt="스크린샷 2026-02-16 오전 12 49 39" src="https://github.com/user-attachments/assets/7ff3a585-4469-452b-b44c-21d75af44d33" />

> Mobile 화면

<img width="495" height="661" alt="스크린샷 2026-02-16 오전 12 47 53" src="https://github.com/user-attachments/assets/ccfc4568-69a1-4194-a096-0e46be90f5b6" />

> 시연 영상

![project_movie](https://github.com/user-attachments/assets/7b17602f-2a9b-410e-bfb0-cbaa8bd5c8dd)

## 프로젝트 실행 방법

### 실행 방법

1. Node.js 설치
   - 이 프로젝트는 아래 버전을 권장합니다:
   - Node.js >= 18 (LTS 권장)
   - ⚠️ Node 16 이하에서는 Vite 7 / React 19 / TailwindCSS 4 환경에서 오류가 발생할 수 있습니다.

2. 패키지 설치
   `npm install`

3. 환경변수 설정

```
VITE_API_URL=http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0
VITE_API_KEY=발급받은_기상청_API_키
```

4. 개발 서버 실행
   `npm run dev`

브라우저에서 다음 주소로 접속합니다:
http://localhost:5173

5. 프로덕션 빌드
   `npm run build`

6. 빌드 결과 미리보기
   `npm run preview`

### 구조도

```
src/
├── entities
│   ├── location
│   │   ├── lib
│   │   │   └── findNearest.ts
│   │   ├── model
│   │   │   ├── types.ts
│   │   │   └── locationStore.ts
│   │   └── data
│   │       ├── korea_districts_with_xy.json
│   │       └── korea_districts.json
│   ├── weather
│   │   ├── api
│   │   │   └── weatherApi.ts
│   │   ├── model
│   │   │   ├── types.ts
│   │   │   ├── useShortTermForecast.ts
│   │   │   └── useUltraShortNowcast.ts
│   │   ├── ui
│   │   │   └── WeatherEmoji.tsx
│   │   └── lib
│   │       ├── parseUltraShortNowcast.ts
│   │       ├── emojiMaps.ts
│   │       ├── categoryInfo.ts
│   │       ├── getForecastTime.ts
│   │       ├── getBaseDateTime.ts
│   │       ├── parseShortTermForecast.ts
│   │       ├── useFormattedNow.ts
│   │       ├── getWeatherEmoji.ts
│   │       └── lcc.ts
│   └── favorite
│       └── model
│           ├── types.ts
│           └── useFavoriteStore.ts
├── app
│   ├── main.tsx
│   ├── providers
│   │   └── QueryProvider.tsx
│   ├── App.tsx
│   └── styles
│       └── main.css
├── features
│   ├── get-location
│   │   └── model
│   │       ├── useCurrentLocation.ts
│   │       └── useInitCurrentLocation.ts
│   ├── search
│   │   └── model
│   │       └── useSearchLocation.ts
│   └── theme-toggle
│       └── model
│           └── useTheme.ts
├── pages
│   └── home
│       └── Home.tsx
├── shared
│   ├── assets
│   │   └── react.svg
│   ├── ui
│   │   ├── LoadingSpinner.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── WarningMessage.tsx
│   │   └── ErrorMessage.tsx
│   ├── lib
│   │   └── utils
│   │       ├── formatValue.ts
│   │       ├── convertDistrictsExcel.ts
│   │       ├── convertDistrictsName.ts
│   │       └── normalizeString.ts
│   └── data
│       └── xy_district.xlsx
└── widgets
    ├── weather
    │   ├── FavoriteButton.tsx
    │   ├── MainWeatherCard.tsx
    │   └── MainWeatherWidget.tsx
    ├── header
    │   ├── Header.tsx
    │   ├── SearchInput.tsx
    │   ├── ThemeToggle.tsx
    │   └── CurrentLocationButton.tsx
    └── favorite
        ├── NoFavoriteLocationCard.tsx
        ├── DeleteFavoriteButton.tsx
        ├── EditNicknameButton.tsx
        ├── FavoriteLocationWidget.tsx
        └── FavoriteLocationCard.tsx
```

## 구현한 기능에 대한 설명

### 현재 위치 날씨 정보

- 첫 화면 진입시 브라우저 위치 권한을 요청합니다.
- 허용 시 현재 위치와 날씨 정보를 자동으로 불러옵니다.

### 지역 검색

- PC: 상단 검색창에서 지역 검색 후 선택
- Mobile: 우측 상단 돋보기 클릭 -> 검색 팝업 표시

### 즐겨찾기

- 날씨 카드 우측 상단 하트 클릭 -> 즐겨찾기 추가/해제
- 즐겨찾기는 로컬스토리지에 저장됩니다.

### 즐겨찾기 관리

- 즐겨찾기된 지역은 목록으로 표시되며 클릭 시 해당 날씨 정보로 이동
- 즐겨찾기 이름 변경 가능(기본값은 지역명)
- 삭제 기능 제공

### 테마 관리

- 우측 상단 테마 변경 버튼으로 라이트/다크 테마 전환 가능

## 기술적 의사결정 및 이유

- Vite : 본 프로젝트는 Vite를 빌드 툴로 채택하고 있습니다. 빠른 HMR과 (Hot Modul Replacement) 가벼운 번들링으로 React 개발에 최적화되어 선택했습니다.
- [기상청 단기예보 Open API](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084) : 한국 기준 날씨 데이터에 최적화되어 활용하고 있습니다.
- FSD(Feature Sliced Design) 구조:
  - entities: favorite, location, weather 를 통해 즐겨찾기 정보, 위치 정보, 날씨 정보를 관리합니다.
  - features : search(검색), get-location(현재 위치정보), theme-toggle(테마 전환)
  - 공통 책임 분리를 통해 유지보수에 용이하도록 했습니다.
- Tanstack Query : 서버 상태관리로 API 요청을 효율적으로 캐싱/리패칭하도록 했습니다.
- Zustand :
  - 위치 정보, 즐겨찾기 정보를 전역 상태로 관리하여 과도한 props drilling을 방지합니다.
  - 즐겨찾기 정보의 경우 persist 기능을 통해 로컬스토리지에 저장합니다.

## 사용 기술 스택

- React 19 + Typescript + Vite
- TailwindCSS 4
- Zustand
- Tanstack Query
