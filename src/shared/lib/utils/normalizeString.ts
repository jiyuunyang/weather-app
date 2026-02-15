/**
 * 입력한 텍스트의 공백을 삭제하고 정규화하여 검색시 일치도를 높임
 * @param string - 원본 텍스트
 * @returns 공백을 삭제하고 정규화한 텍스트
 */
export const normalizeString = (str: string) => str.trim().replace(/\s+/g, ' ');
