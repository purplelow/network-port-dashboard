import { useEffect, useState } from "react";
import { AiOutlineFolderView } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";
import { routerUrl } from "recoil/atom";
import axios from "axios";

import useGetLogFilelist from "@api/management/getLogFilelist";
import LoadingB from "@components/common/LoadingB";
import Layout from "@components/layout";
import DownloadButton from "./DownloadBtn";

import "react-toastify/dist/ReactToastify.css";

const LOGVIEW_API_URL = process.env.NEXT_PUBLIC_GET_LOGVIEW;

const History = () => {
  const ABS_URL = useRecoilValue(routerUrl);
  const { logFilelist }: any = useGetLogFilelist(ABS_URL);
  const [currentFileName, setCurrentFimeName] = useState("");
  const [logViewData, setLogViewData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentFimeName(logFilelist?.filenames.toString().split(",")[0]);
  }, [logFilelist]);

  const logViewHandle = () => {
    setLoading(true);
    const defaultFileName = logFilelist?.filenames;
    axios({
      method: "GET",
      url: `${ABS_URL}${LOGVIEW_API_URL}${currentFileName ?? defaultFileName}`,
    })
      .then((res) => {
        setLogViewData(res.data.logview);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("로그 파일 보기 오류 !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <Layout title="히스토리">
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="grid h-full">
        <div className="w-full overflow-hidden rounded-md bg-white p-10 shadow-md">
          <div className="flex items-center justify-start space-x-4">
            <span className="border-gray-300">파일 선택</span>
            <select
              disabled={loading ? true : false}
              onChange={(e) => setCurrentFimeName(e.target.value)}
              id="countries"
              className=" w-1/3 rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-2 focus:border-gray-700"
            >
              {logFilelist?.filenames.map((item: string, i: any) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
            {loading ? (
              <button
                disabled
                type="button"
                className="flex cursor-wait items-center space-x-2 rounded-sm border border-slate-400 bg-slate-400 p-2 pr-8 pl-6 text-sm font-medium text-white hover:bg-slate-500 "
              >
                <AiOutlineFolderView className="text-2xl" />
                <span>로그 파일 로드중</span>
              </button>
            ) : (
              <button
                onClick={logViewHandle}
                type="button"
                className="flex items-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2 pr-8 pl-6 text-sm font-medium text-white hover:bg-blue-800 "
              >
                <AiOutlineFolderView className="text-2xl" />
                <span>로그 보기</span>
              </button>
            )}
            <DownloadButton ABS_URL={ABS_URL} fileName={currentFileName} />
          </div>

          <div className="mt-10 h-[calc(100%-80px)] w-full overflow-auto whitespace-pre-line rounded-md border-[1px] border-gray-400 p-4">
            {loading ? <LoadingB /> : logViewData}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
