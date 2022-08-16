import Swal from "sweetalert2";
import { encryptModule } from "@libs/encryptModule";
import { toast } from "react-toastify";
import updateNetwork from "@api/setting/updateNetwork";
import axios from "axios";
import { useState } from "react";

const PASSWORD_API_URL = process.env.NEXT_PUBLIC_PASSWORD_CHECK;
const RESTART_API_URL = process.env.NEXT_PUBLIC_RESTART;
const UPLOAD_FIRMWARE_API_URL = process.env.NEXT_PUBLIC_UPLOAD_FIRMWARE;
const RESTORE_API_URL = process.env.NEXT_PUBLIC_RESTORE;

export default function AlertAdminReq(
  ABS_URL: string,
  reqSwitch: string,
  data: any | null | undefined
) {
  Swal.fire({
    title:
      '<strong style="font-size: 24px;">관리자 암호를 입력하세요.</strong>\n <u style="font-size: 20;">서비스가 재시작 됩니다.</u>',
    icon: "warning",
    input: "password",
    inputAttributes: {
      autocapitalize: "off",
      checkCapsLock: "on",
    },
    inputPlaceholder: "관리자 암호를 입력하세요",
    showCancelButton: true,
    confirmButtonText: "확인",
    showLoaderOnConfirm: true,
    cancelButtonText: "취소",
    confirmButtonColor: "#3e47c9",
    cancelButtonColor: "#707070",
    preConfirm: async (login) => {
      const reqForAdmin: any = {
        passWord: encryptModule(login),
      };

      try {
        const res = await fetch(`${ABS_URL}${PASSWORD_API_URL}`, {
          method: "POST",
          body: JSON.stringify(reqForAdmin),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return await res.json();
      } catch (err) {
        Swal.showValidationMessage(`올바른 암호를 입력하세요.`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      if (reqSwitch === "reboot") {
        Swal.fire({
          title: `<strong style="font-size: 24px;">시스템을 재부팅 합니다.</strong>`,
          icon: "success",
        });
        return fetch(`${ABS_URL}${RESTART_API_URL}`, {
          // return fetch(`UI Design Test`, {
          method: "GET",
        })
          .then((res) => {
            toast.success("시스템을 재부팅 합니다.", {
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
          title: `<strong style="font-size: 24px;">네트워크 설정 적용 후, 서비스를 재시작 합니다.</strong>`,
          icon: "success",
        });
        updateNetwork({ ABS_URL }, data);
      } else if (reqSwitch === "firmware") {
        Swal.fire({
          title: `<strong style="font-size: 24px;">펌웨어 업데이트 후, 서비스를 재시작 합니다.</strong>`,
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
            toast.success("펌웨어 업데이트를 진행합니다.", {
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
          title: `<strong style="font-size: 24px;">복원 후, 시비스를 재시작 합니다.</strong>`,
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
            toast.success("복원을 진행합니다.", {
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
