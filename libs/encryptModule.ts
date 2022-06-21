import CryptoJS from "crypto-js";

const APP_SECRET_KEY: any = process.env.NEXT_PUBLIC_SECRET_KEY;

export const encryptModule = (pwData: any) =>
  CryptoJS.AES.encrypt(pwData, CryptoJS.enc.Utf8.parse(APP_SECRET_KEY), {
    iv: CryptoJS.enc.Utf8.parse(APP_SECRET_KEY.substring(0, 16)), // [Enter IV (Optional) 지정 방식]
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).toString();
