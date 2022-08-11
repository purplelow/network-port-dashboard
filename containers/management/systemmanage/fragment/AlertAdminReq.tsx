import Swal from "sweetalert2";
import { encryptModule } from "@libs/encryptModule";
import { toast } from "react-toastify";
import updateNetwork from "@api/setting/updateNetwork";
import axios from "axios";

const PASSWORD_API_URL = process.env.NEXT_PUBLIC_PASSWORD_CHECK;
const RESTART_API_URL = process.env.NEXT_PUBLIC_RESTART;
const UPLOAD_FIRMWARE_API_URL = process.env.NEXT_PUBLIC_UPLOAD_FIRMWARE;
const RESTORE_API_URL = process.env.NEXT_PUBLIC_RESTORE;

export default function AlertAdminReq(
  ABS_URL: string,
  reqSwitch: string,
  data: any | null | undefined
) {
  // const checkCapsLock = (e: any) => {
  //   let capsLock = e.getModifierState("CapsLock");
  //   if (capsLock) alert("CapsLock On");
  // };

  Swal.fire({
    title: "관리자 암호를 입력하세요.\n시스템이 재시작 됩니다.",
    // html: `<input id="login" type="password" onKeyDown={(e) => checkCapsLock(e)} placeholder="관리자 암호를 입력하세요"/>`,
    input: "password",
    inputAttributes: {
      // autocapitalize: "off",
      checkCapsLock: "on",
    },
    showCancelButton: true,
    confirmButtonText: "확인",
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
      if (reqSwitch === "reboot") {
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
      } else if (reqSwitch === "network") {
        Swal.fire({
          title: `네트워크 설정 적용 후, 시스템이 재부팅 됩니다.`,
        });
        updateNetwork({ ABS_URL }, data);
      } else if (reqSwitch === "firmware") {
        Swal.fire({
          title: `펌웨어 업데이트 후, 시스템이 재부팅 됩니다.`,
        });
        axios({
          method: "POST",
          url: `${ABS_URL}${UPLOAD_FIRMWARE_API_URL}`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
            // "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => {
            // setAlert(true);
            toast.success("펌웨어 파일 업로드 완료.", {
              position: toast.POSITION.TOP_CENTER,
            });
          })
          .catch((error) => {
            // setErrorAlert(true);
            toast.error("펌웨어 파일 업로드 오류 !!", {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      } else if (reqSwitch === "restore") {
        Swal.fire({
          title: `복원 후, 시스템이 재부팅 됩니다.`,
        });
        axios({
          method: "POST",
          url: `${ABS_URL}${RESTORE_API_URL}`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            // setRestoreSuccess(true);
            toast.success("복원 파일 업로드 완료.", {
              position: toast.POSITION.TOP_CENTER,
            });
          })
          .catch((error) => {
            // setRestoreFail(true);
            if (error.response.data.code === "C004")
              toast.error("파일 업로드 오류 !!", {
                position: toast.POSITION.TOP_CENTER,
              });
            else if (error.response.data.code === "F003")
              toast.error("이 시스템과 호환되지 않는 백업파일입니다.", {
                position: toast.POSITION.TOP_CENTER,
              });
            else
              toast.error("파일 업로드 오류 !!", {
                position: toast.POSITION.TOP_CENTER,
              });
          });
      }
    }
  });
}
