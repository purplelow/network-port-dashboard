import { atom } from "recoil";

export const backUpState = atom({
  key: "setBackUpSuccess",
  default: false,
});

export const backUpFailState = atom({
  key: "setBackUpFail",
  default: false,
});

export const restoreState = atom({
  key: "restoreState",
  default: false,
});

export const restoreFailState = atom({
  key: "restoreFailState",
  default: false,
});

export const routerUrl = atom({
  key: "routerUrl",
  default: "",
});
