import fs from 'fs';
import xlsx from 'xlsx';

interface DistrictRow {
  '1단계'?: string;
  '2단계'?: string;
  '3단계'?: string;
  '격자 X'?: number | string;
  '격자 Y'?: number | string;
  '위도(초/100)'?: number | string;
  '경도(초/100)'?: number | string;
}

// 엑셀 파일 읽기
const workbook = xlsx.readFile('./xy_district.xlsx'); // 엑셀 파일 경로
const sheetName = workbook.SheetNames[0]; // 첫 번째 시트
const sheet = workbook.Sheets[sheetName];

// 시트 → JSON
const data = xlsx.utils.sheet_to_json<DistrictRow>(sheet);

// 변환
const result = data.map((row) => {
  // 1~3단계 합쳐서 이름 생성
  const nameParts = [row['1단계'], row['2단계'], row['3단계']]
    .filter(
      (part) =>
        part !== undefined && part !== null && String(part).trim() !== '',
    )
    .map((part) => String(part).trim());

  const name = nameParts.join('-');

  return {
    name,
    x: Number(row['격자 X']),
    y: Number(row['격자 Y']),
    lat: Number(row['위도(초/100)']),
    lon: Number(row['경도(초/100)']),
  };
});

// JSON 파일로 저장
fs.writeFileSync(
  './korea_districts_with_xy.json',
  JSON.stringify(result, null, 2),
  'utf-8',
);

console.log('변환 완료! korea_districts_with_xy.json 생성됨.');
