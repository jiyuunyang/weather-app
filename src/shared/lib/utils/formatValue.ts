/**
 * 텍스트를 문자열 그대로 / 숫자의 경우 내림값 문자열로 반환
 * @param string - 원본 텍스트
 * @returns - 변환된 텍스트
 */
export function formatValue(val: string): string {
  const num = Number(val);
  if (Number.isNaN(num)) return val; // 문자열 그대로 반환 (예: "강수없음")
  return Number.isInteger(num) ? val : String(Math.floor(num));
}
