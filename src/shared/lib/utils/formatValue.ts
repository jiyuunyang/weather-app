export function formatValue(val: string): string {
  const num = Number(val);
  if (Number.isNaN(num)) return val; // 문자열 그대로 반환 (예: "강수없음")
  return Number.isInteger(num) ? val : String(Math.floor(num));
}
