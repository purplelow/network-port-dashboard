import useGetLogFilelist from "@api/management/getLogFilelist";
import useGetLogView from "@api/management/getLogView";
import Layout from "@components/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import DownloadButton from "./DownloadBtn";

const History = () => {
  const { logFilelist, defaultFileName } = useGetLogFilelist();
  const [currentFileName, setCurrentFimeName]: any = useState();
  const { getLogView, isLoading } = useGetLogView(currentFileName);

  // const [logtxt, setLogtxt] = useState();

  // const getLogData = async () => {
  //   await axios({
  //     method: "get",
  //     url: `http://192.168.123.190:8080/api/history/getLogView?fileName=${currentFileName}`,
  //   }).then(res => {
  //     setLogtxt({res.data})
  //   });
  // };

  // useEffect(() => {}, [currentFileName]);

  // console.log("@@ log data TXT :: ", getLogData);

  return (
    <Layout title="히스토리">
      <div className="grid h-full">
        <div className="w-full overflow-hidden rounded-md bg-white p-10 shadow-md">
          <div className="flex items-center justify-start space-x-4">
            <span className="border-gray-300">파일 선택</span>
            <select
              onChange={(e) => setCurrentFimeName(e.target.value)}
              id="countries"
              className=" w-1/3 rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-2 focus:border-gray-700"
            >
              {logFilelist?.filenames.map((item: string, i: number) => (
                <option defaultValue={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
            <DownloadButton fileName={currentFileName} />
          </div>

          <div className="mt-10 h-[calc(100%-80px)] w-full overflow-auto rounded-md border-[1px] border-gray-400 p-4">
            {isLoading ? "" : getLogView?.logview}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
