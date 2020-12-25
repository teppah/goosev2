export function range(start: number, end: number): number[] {
  if (start === end) {
    return [];
  }
  return [...Array(end - start).keys()].map((n) => n + start);
}

export function getPageStartNumber(nPages: number[], pageIndex: number) {
  return nPages.slice(0, pageIndex).reduce((prev, next) => prev + next, 1);
}

export function downloadUint8ToFile(
  data: Uint8Array,
  filename: string,
  mimeType: string
) {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);

  downloadUrl(url, filename);
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

function downloadUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.style.display = "none";
  a.click();
  a.remove();
}
