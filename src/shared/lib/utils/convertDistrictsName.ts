import type { District } from '@/entities/location/model/types';
import fs from 'fs';

// JSON 파일 읽기
const districtsWithXY: District[] = JSON.parse(
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
