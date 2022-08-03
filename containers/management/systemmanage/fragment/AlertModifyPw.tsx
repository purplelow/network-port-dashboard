import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { encryptModule } from "@libs/encryptModule";
import { toast } from "react-toastify";
import { cls } from "@libs/utils";

interface ModifyPwForm {
  asisPw: string;
  tobePw?: string;
  tobePwCheck: string;
}

const MODIFYPASSWD_API_URL = process.env.NEXT_PUBLIC_MODIFY_PASSWORD;

export default function AlertModifyPw({ ABS_URL, open, close, header }: any) {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ModifyPwForm>();
  const [asisPwd, setAsisPwd] = useState<ModifyPwForm>();
  const [tobePwd, setTobePwd] = useState<ModifyPwForm>();
  const [modiFyPwSuccess, setModiFyPwSuccess] = useState(false);

  const passwordJson = {
    asisPwd: encryptModule(asisPwd),
    tobePwd: encryptModule(tobePwd),
  };

  const onValid = () => {
    // modifyPassword(passwordJson);
    axios
      .put(`${ABS_URL}${MODIFYPASSWD_API_URL}`, passwordJson)
      .then((res) => {
        setModiFyPwSuccess(true);
        // toast.success("비밀번호 변경 완료.", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      })
      .catch((err) => {
        toast.error("비밀번호 수정 오류 !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const handlePwType = (e: any) => {
    setPwType(() => {
      if (!pwType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const checkCapsLock = (e: any) => {
    let capsLock = e.getModifierState("CapsLock");
    setCapsLockFlag(capsLock);
  };

  return (
    <>
      <div
        onClick={close}
        className="fixed top-0 left-0 z-20 h-screen w-screen bg-black opacity-30"
      ></div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="fixed top-1/2 left-1/2 z-30 h-auto w-auto -translate-x-1/2 -translate-y-1/2 rounded-md bg-white py-10 px-4 shadow-2xl"
      >
        <div className="w-full pb-4 text-center text-xl font-medium text-slate-700">
          {header}
        </div>
        <div className="mb-7 flex items-center pr-10">
          <div className="w-1/3 min-w-[140px]">
            <label
              className="block pr-4 text-right text-sm font-medium text-gray-900"
              htmlFor="asisPw"
            >
              현재 비밀번호
            </label>
          </div>
          <div className="relative w-2/3">
            <input
              {...register("asisPw", {
                required: "비밀번호를 입력하세요.",
                onChange: (e) => setAsisPwd(e.target.value),
                minLength: {
                  value: 4,
                  message: "최소 4자 이상의 비밀번호를 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하의 비밀번호만 사용가능합니다.",
                },
              })}
              className="w-full appearance-none rounded border border-gray-400 bg-gray-50 py-2 px-4 text-sm leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
              id="asisPw"
              type={pwType.type}
              onKeyDown={(e) => checkCapsLock(e)}
            />
            {errors.asisPw && (
              <p className="absolute -bottom-4 min-w-[220px] text-xs italic text-red-500">
                {errors.asisPw.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-7 flex items-center pr-10">
          <div className="w-1/3 min-w-[140px]">
            <label
              className="block pr-4 text-right text-sm font-medium text-gray-900"
              htmlFor="tobePw"
            >
              새 비밀번호
            </label>
          </div>
          <div className="relative w-2/3">
            <input
              {...register("tobePw", {
                required: "새로운 비밀번호를 입력하세요.",
                minLength: {
                  value: 4,
                  message: "최소 4자 이상의 비밀번호를 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하의 비밀번호만 사용가능합니다.",
                },
                validate: {
                  matchesAsisPw: (value) => {
                    const asisPw = getValues("asisPw");
                    return asisPw !== value || "기존 비밀번호와 같습니다.";
                  },
                },
              })}
              className="w-full appearance-none rounded border border-gray-400 bg-gray-50 py-2 px-4 text-sm leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
              id="tobePw"
              type={pwType.type}
              onKeyDown={(e) => checkCapsLock(e)}
            />
            {errors.tobePw && (
              <p className="absolute -bottom-4 min-w-[220px] text-xs italic text-red-500">
                {errors.tobePw.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center pr-10">
          <div className="w-1/3 min-w-[140px]">
            <label
              className="block  pr-4 text-right text-sm font-medium text-gray-900"
              htmlFor="tobePwCheck"
            >
              새 비밀번호 확인
            </label>
          </div>
          <div className="relative w-2/3">
            <input
              {...register("tobePwCheck", {
                required: "비밀번호가 일치하지 않습니다.",
                onChange: (e) => setTobePwd(e.target.value),
                validate: {
                  matchesPreviousPw: (value) => {
                    const tobePw = getValues("tobePw");
                    return tobePw === value || "비밀번호가 일치하지 않습니다.";
                  },
                },
              })}
              className="w-full appearance-none rounded border border-gray-400 bg-gray-50 py-2 px-4 text-sm leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
              id="tobePwCheck"
              type={pwType.type}
              onKeyDown={(e) => checkCapsLock(e)}
            />
            {errors.tobePwCheck && (
              <p className="absolute -bottom-4 min-w-[220px] text-xs italic text-red-500">
                {errors.tobePwCheck.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-6 flex items-center justify-center space-x-3">
          <div className="flex items-center justify-center">
            <input id="showPW" type="checkbox" onClick={handlePwType} />
            <label htmlFor="showPW" className="px-1 text-xs text-gray-700">
              비밀번호 표시
            </label>
          </div>
          <span
            className={cls(
              "right-0 w-24 rounded-md  py-1 px-1 text-center text-xs text-white",
              capsLockFlag ? "bg-red-600" : "bg-green-500"
            )}
          >
            {capsLockFlag ? "Caps Lock On" : "Caps Lock Off"}
          </span>
        </div>
        <div className="reative flex items-center justify-center space-x-4">
          <button
            className="focus:shadow-outline rounded bg-blue-600 py-2 px-20 font-medium text-white shadow hover:bg-blue-500 focus:outline-none"
            type="submit"
          >
            변경하기
          </button>
          <button
            onClick={close}
            className="focus:shadow-outline rounded bg-slate-500 py-2 px-8 font-medium text-white shadow hover:bg-slate-400 focus:outline-none"
            type="button"
          >
            취소
          </button>
        </div>
      </form>
      {modiFyPwSuccess && (
        <>
          <div
            onClick={close}
            className="fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-30"
          ></div>
          <div
            className="absolute top-7 left-1/2 z-50 -translate-x-1/2 rounded-b  border-t-4 border-teal-500 bg-teal-100 px-8 py-3 text-teal-900 shadow-2xl"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <AiOutlineCheckCircle className="mr-3 fill-current text-3xl text-teal-500" />
              </div>
              <div>
                <p className="py-1 font-bold">비밀번호 변경 완료</p>
                <p className="py-1 text-sm">
                  새로운 비밀번호로 변경 되었습니다.
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <button
                onClick={close}
                className="focus:shadow-outline rounded bg-slate-500 py-2 px-8 font-medium text-white shadow hover:bg-slate-400 focus:outline-none"
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
