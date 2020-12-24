import { atom, selector } from "recoil";

export const fileState = atom<File>({
  key: "file",
  default: null,
});

export type Format = {
  formatString: string;
  isInvalidated: boolean;
};

export const formatState = atom<Format>({
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
