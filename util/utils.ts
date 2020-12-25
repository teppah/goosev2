export function range(start: number, end: number): number[] {
  if (start === end) {
    return [];
  }
  return [...Array(end - start).keys()].map((n) => n + start);
}

export function getPageStartNumber(nPages: number[], pageIndex: number) {
  return nPages.slice(0, pageIndex).reduce((prev, next) => prev + next, 1);
}
