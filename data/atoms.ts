import { atom, selector } from "recoil";

export const fileState = atom<File>({
  key: "file",
  default: null,
});

export type FormatType = {
  formatString: string;
  isInvalidated: boolean;
};

export const formatState = atom<FormatType>({
  key: "format",
  default: { formatString: "", isInvalidated: false },
});

export const isShowInvalid = selector({
  key: "isValidatedState",
  get: ({ get }) => {
    const format = get(formatState);
    return format.isInvalidated;
  },
});

export type PageType = {
  pages: number[];
  outputFileFormat: string;
};

export const pageState = atom<PageType>({
  key: "page",
  default: { pages: [], outputFileFormat: "{d}.pdf" },
});