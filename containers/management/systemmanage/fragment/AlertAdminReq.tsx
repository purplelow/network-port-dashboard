import Swal from "sweetalert2";
import { encryptModule } from "@libs/encryptModule";
import { toast } from "react-toastify";

const PASSWORD_API_URL = process.env.NEXT_PUBLIC_PASSWORD_CHECK;
const RESTART_API_URL = process.env.NEXT_PUBLIC_RESTART;

export default function AlertAdminReq(ABS_URL: string) {
  // const checkCapsLock = (e: any) => {
  //   let capsLock = e.getModifierState("CapsLock");
  //   if (capsLock) alert("CapsLock On");
  // };

  Swal.fire({
    title: "관리자 암호를 입력하세요.",
    // html: `<input id="login" type="password" onKeyDown={(e) => checkCapsLock(e)} placeholder="관리자 암호를 입력하세요"/>`,
    input: "password",
    inputAttributes: {
      // autocapitalize: "off",
      checkCapsLock: "on",
    },
    showCancelButton: true,
    confirmButtonText: "재부팅",
    showLoaderOnConfirm: true,
    cancelButtonText: "취소",
    preConfirm: (login) => {
      const reqForAdmin: any = {
        passWord: encryptModule(login),
      };

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
          toast.success("시스템이 재부팅 됩니다.", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          toast.error("재부팅 오류 !!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  });
}
