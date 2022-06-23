import Swal from "sweetalert2";
import { encryptModule } from "@libs/encryptModule";

const PASSWORD_API_URL = process.env.NEXT_PUBLIC_PASSWORDCHECK;
const RESTART_API_URL = process.env.NEXT_PUBLIC_RESTART;

export default function AlertAdminReq(ABS_URL: string) {
  console.log("Recoil 전역 상태 ABS_URL :: ", ABS_URL);
  Swal.fire({
    title: "관리자 암호를 입력하세요.",
    input: "password",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "재부팅",
    showLoaderOnConfirm: true,
    cancelButtonText: "취소",
    preConfirm: (login) => {
      // const data = "admin";
      console.log("로그인 암호", login);

      const reqForAdmin: any = {
        passWord: encryptModule(login),
      };
      // console.log("암호화 키 ? :: ", cipher);
      return fetch(`${ABS_URL}${PASSWORD_API_URL}`, {
        method: "POST",
        body: JSON.stringify(reqForAdmin),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .catch((err) => {
          Swal.showValidationMessage(`올바른 암호를 입력하세요.`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `시스템이 재부팅 됩니다.`,
      });
      // imageUrl: result.value.avatar_url,
      return fetch(`${ABS_URL}${RESTART_API_URL}`, {
        method: "GET",
      })
        .then((res) => {
          console.log("시스템 재부팅 !! : ", res);
        })
        .catch((err) => {
          console.log("시스템 재부팅 에러 !! : :", err);
        });
    }
  });
}
