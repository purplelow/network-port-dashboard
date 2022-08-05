import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UPLOAD_FIRMWARE_API_URL = process.env.NEXT_PUBLIC_UPLOAD_FIRMWARE;
interface firmFile {
  file: object;
}
export default function FirmwareForm({ ABS_URL }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedFile, setSelectedFile] = useState<firmFile | any | Blob>();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    errors.files &&
      toast.warning("파일을 업로드하세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
  }, [errors.files]);

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setAlert(false);
  //     setErrorAlert(false);
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [alert, errorAlert]);

  const uploadFile = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios({
      method: "POST",
      url: `${ABS_URL}${UPLOAD_FIRMWARE_API_URL}`,
      data: formData,
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
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between space-x-4"
    >
      <label
        htmlFor="firmFileUp"
        className="relative -right-11 cursor-pointer text-blue-700"
      >
        <AiOutlineUpload />
      </label>
      <input
        {...register("files", { required: true })}
        accept=".jar"
        id="firmFileUp"
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
        펌웨어 버전 업데이트
      </button>

      {/* {alert && (
        <div
          role="alert"
          className="absolute top-5 left-[calc(50%-160px)] w-80 shadow-2xl"
        >
          <div className="rounded-t bg-blue-500 px-4 py-2 font-bold text-white">
            펌웨어 파일 업로드 완료
          </div>
          <div className="rounded-b border border-t-0 border-blue-400 bg-blue-100 px-4 py-3 text-blue-700">
            <p>펌웨어 업데이트를 시작합니다</p>
          </div>
        </div>
      )}
      {errorAlert && (
        <div
          role="alert"
          className="absolute top-5 left-[calc(50%-160px)] w-80 shadow-2xl"
        >
          <div className="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
            파일 업로드 실패
          </div>
          <div className="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
            <p>⚠️ 선택된 파일이 없습니다</p>
          </div>
        </div>
      )} */}
    </form>
  );
}
