export function range(start: number, end: number): number[] {
  return [...Array(end - start).keys()].map((n) => n + start);
}
