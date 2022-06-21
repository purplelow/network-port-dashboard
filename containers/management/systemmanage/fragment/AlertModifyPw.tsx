import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { encryptModule } from "@libs/encryptModule";

interface ModifyPwForm {
  asisPw: number;
  tobePw?: number;
  tobePwCheck: number;
}

const MODIFYPASSWD_API_URL = process.env.NEXT_PUBLIC_MODIFYPASSWORD;

export default function AlertModifyPw({ ABS_URL, open, close, header }: any) {
  const { register, handleSubmit } = useForm<ModifyPwForm>();
  const [asisPwd, setAsisPwd]: any = useState("");
  const [tobePwd, setTobePwd]: any = useState("");
  const [modiFyPwSuccess, setModiFyPwSuccess] = useState(false);

  const passwordJson = {
    asisPwd: encryptModule(asisPwd),
    tobePwd: encryptModule(tobePwd),
  };
  console.log("비밀번호 encrypt 값 json data : ", passwordJson);

  const onValid = () => {
    // modifyPassword(passwordJson);
    axios
      .put(`${ABS_URL}${MODIFYPASSWD_API_URL}`, passwordJson)
      .then((res) => {
        setModiFyPwSuccess(true);
      })
      .catch((err) => {
        console.error("비밀번호 수정 오류 : ", err);
        alert("비밀번호 수정 오류");
      });
    console.log("im valid !");
  };
  console.log("현재 비밀번호 인풋 값? : ", asisPwd);
  console.log("새로운 비밀번호 인풋 값? : ", tobePwd);

  return (
    <>
      <div
        onClick={close}
        className="fixed top-0 left-0 z-20 h-screen w-screen bg-black opacity-30"
      ></div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="fixed top-1/2 left-1/2 z-30 h-auto w-auto -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-10 shadow-2xl"
      >
        <div className="w-full pb-4 text-center text-2xl font-medium text-slate-700">
          {header}
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-1/3 min-w-[120px]">
            <label
              className="block pr-4 text-right text-base font-medium text-gray-600"
              htmlFor="inline-full-name"
            >
              현재 비밀번호
            </label>
          </div>
          <div className="w-2/3">
            <input
              {...register("asisPw", {
                required: "올바른 현재 비밀번호를 입력하세요.",
                onChange: (e) => setAsisPwd(e.target.value),
              })}
              className="w-full appearance-none rounded border-[1px] border-gray-500 bg-gray-100 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              id="inline-full-name"
              type="password"
            />
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-1/3 min-w-[120px]">
            <label
              className="block pr-4 text-right text-base font-medium text-gray-600"
              htmlFor="inline-password"
            >
              새로운 비밀번호
            </label>
          </div>
          <div className="w-2/3">
            <input
              {...register("tobePw", {
                // required: "새로운 비밀번호를 입력하세요.",
              })}
              className="w-full appearance-none rounded border-[1px] border-gray-500 bg-gray-100 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              id="inline-password"
              type="password"
            />
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <div className="w-1/3 min-w-[120px]">
            <label
              className="block  pr-4 text-right text-base font-medium text-gray-600"
              htmlFor="inline-password"
            >
              새로운 비밀번호 확인
            </label>
          </div>
          <div className="w-2/3">
            <input
              {...register("tobePwCheck", {
                required: "비밀번호가 일치하지 않습니다.",
                onChange: (e) => setTobePwd(e.target.value),
              })}
              className="w-full appearance-none rounded border-[1px] border-gray-500 bg-gray-100 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              id="inline-password"
              type="password"
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-medium text-white shadow hover:bg-purple-400 focus:outline-none"
            type="submit"
          >
            변경하기
          </button>
          <button
            onClick={close}
            className="focus:shadow-outline rounded bg-slate-500 py-2 px-4 font-medium text-white shadow hover:bg-slate-400 focus:outline-none"
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
