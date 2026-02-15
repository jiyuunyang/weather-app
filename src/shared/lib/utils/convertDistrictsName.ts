import type { Location } from '@/entities/location/model/types';
import fs from 'fs';

/* 
convertDistrictsExcel 파일을 통해 생성한
korea_districts_with_xy.json 파일을
name(지역명)만 추출한
json 배열 파일로 변환시킴
*/

// JSON 파일 읽기
const districtsWithXY: Location[] = JSON.parse(
  fs.readFileSync('./korea_districts_with_xy.json', 'utf-8'),
);

// name만 추출
const districtNames = districtsWithXY.map((d) => d.name);

// JSON 파일로 저장
fs.writeFileSync(
  './korea_districts.json',
  JSON.stringify(districtNames, null, 2),
  'utf-8',
);

console.log('변환 완료! korea_districts.json 생성됨.');
