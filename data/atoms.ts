import { atom } from "recoil";

export const fileState = atom<File>({
  key: "file",
  default: null,
});
