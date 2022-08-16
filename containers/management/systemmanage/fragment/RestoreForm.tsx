import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { restoreFailState, restoreState } from "recoil/atom";
import AlertAdminReq from "./AlertAdminReq";

export default function RestoreFrom({ ABS_URL }: any) {
  // const [restoreSuccess, setRestoreSuccess] = useRecoilState(restoreState);
  // const [restoreFail, setRestoreFail] = useRecoilState(restoreFailState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedFile, setSelectedFile] = useState<any | Blob>();

  useEffect(() => {
    errors.files &&
      toast.warning("파일을 업로드하세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
  }, [errors.files]);

  const uploadFile = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    AlertAdminReq(ABS_URL, "restore", formData);
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
        {...register("files", { required: true })}
        id="backUpFileUp"
        accept=".bak"
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
