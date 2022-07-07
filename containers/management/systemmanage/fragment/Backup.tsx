import getBackUpFile from "@api/management/getBackUpFile";
import { useCallback } from "react";
import { AiOutlineDownload } from "react-icons/ai";

const BACKUP_API_URL = process.env.NEXT_PUBLIC_BACKUP;

export default function BackUp({ ABS_URL }: any) {
  // const [backUpSuccess, setBackUpSuccess] = useRecoilState(backUpState);
  // const [backUpFail, setBackUpFail] = useRecoilState(backUpFailState);
  const handleDownload = () => {
    getBackUpFile(ABS_URL);
  };
  return (
    <button
      onClick={handleDownload}
      type="submit"
      className="flex min-w-[280px] items-center justify-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
    >
      <AiOutlineDownload className="text-2xl" />
      <span>백업 파일 다운로드</span>
    </button>
  );
}
