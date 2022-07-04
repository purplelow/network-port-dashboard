import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { restoreFailState, restoreState, routerUrl } from "recoil/atom";

const RESTORE_API_URL = process.env.NEXT_PUBLCI_RESTORE;

export default function RestoreFrom() {
  const [restoreSuccess, setRestoreSuccess] = useRecoilState(restoreState);
  const [restoreFail, setRestoreFail] = useRecoilState(restoreFailState);
  const { register, handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState<any | Blob>();

  const uploadFile = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = () => {
    const ABS_URL = useRecoilValue(routerUrl);
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios({
      method: "POST",
      url: `${ABS_URL}${RESTORE_API_URL}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        setRestoreSuccess(true);
      })
      .catch((error) => {
        console.error("복원 파일 업로드 에러 : ", error);
        setRestoreFail(true);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between space-x-4"
    >
      <label
        htmlFor="backUpFileUp"
        className="relative -right-11 cursor-pointer text-blue-700"
      >
        <AiOutlineUpload />
      </label>
      <input
        {...register("files")}
        id="backUpFileUp"
        type="file"
        onChange={uploadFile}
        className="min-w-[350px] cursor-pointer border-[1px] border-gray-200 text-sm text-slate-500
                file:mr-4 file:cursor-pointer file:border-0
                file:bg-violet-50 file:py-2
                file:px-8 file:text-sm
                file:font-semibold file:text-blue-700
              "
      />
      <button
        type="submit"
        className="min-w-[280px] rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
      >
        복원
      </button>
    </form>
  );
}
