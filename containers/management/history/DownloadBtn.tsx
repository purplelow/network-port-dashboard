import axios from "axios";
import { AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-toastify";

const DOWNLOAD_LOGFILE_API_URL = process.env.NEXT_PUBLIC_DOWNLOAD_LOGFILE;

export default function DonwloadButton({ ABS_URL, fileName }: any) {
  const handleDownload = () => {
    axios({
      method: "GET",
      url: `${ABS_URL}${DOWNLOAD_LOGFILE_API_URL}${fileName}`,
      responseType: "blob",
    })
      .then((res) => {
        const blob = new Blob([res.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileObjectUrl;

        // const reg = new RegExp(/(_|"|\/)/, "gi");
        // const replaceFileName = fileName.replace(reg, "");
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(fileObjectUrl);
        }, 50000);
        link.remove();

        toast.success("로그 파일을 다운로드 합니다.", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        toast.error("다운로드 오류 !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <button
      onClick={handleDownload}
      type="submit"
      className="flex items-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2 pr-8 pl-6 text-sm font-medium text-white hover:bg-blue-800 "
    >
      <AiOutlineDownload className="text-2xl" />
      <span>로그 파일 다운로드</span>
    </button>
  );
}
