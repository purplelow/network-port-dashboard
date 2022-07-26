import { atom, selector } from "recoil";

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
  default: "http://192.168.123.191:8080",
});

export const upPortsState = atom({
  key: "upPortsState",
  default: [
    {
      id: "-1",
      port: "",
    },
  ],
});

export const downPortsState = atom({
  key: "downPortsState",
  default: [
    {
      id: "-1",
      name: "",
      model: "",
      type: "",
      baudrate: "",
      parity: "",
      databits: "",
      stopbits: "",
      deviceId: "",
    },
  ],
});

export const upPortsCheckList = atom({
  key: "upPortsCheckList",
  default: ["-1"],
});

export const downPortsCheckList = atom({
  key: "downPortsCheckList",
  default: ["-1"],
});

export const mqttUrl = atom({
  key: "mqttUrl",
  default: "ws://192.168.123.191:9001",
});

export const mqttPortDataRender = atom({
  key: "mqttPortDataRender",
  default: { app_service: { id: "", status: "" } },
});

export const currentPortData = selector({
  key: "currentPortData",
  get: ({ get }) => {
    const reId = get(mqttPortDataRender).app_service.id;
    const reStatus = get(mqttPortDataRender).app_service.status;
    return { reId, reStatus };
  },
});
