import LoadingA from "@components/common/LoadingA";
import LoadingB from "@components/common/LoadingB";
import Layout from "@components/layout";
import axios from "axios";
import { useState } from "react";
import { AiOutlineFolderView } from "react-icons/ai";
// import { LeapFrog } from "@uiball/loaders";

import DownloadButton from "./DownloadBtn";

const History = ({ data }: any) => {
  const [currentFileName, setCurrentFimeName] = useState(data?.filenames[0]);
  const [logViewData, setLogViewData] = useState("");
  const [loading, setLoading] = useState(false);

  const logViewHandle = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `http://192.168.123.190:8080/api/history/getLogView?fileName=${currentFileName}`,
    })
      .then((res) => {
        setLogViewData(res.data.logview);
        setLoading(false);
      })
      .catch((err) => console.error("로그 뷰 api 에러 : ", err));
  };

  return (
    <Layout title="히스토리">
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
              {data?.filenames.map((item: string, i: number) => (
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
            <DownloadButton fileName={currentFileName} />
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
