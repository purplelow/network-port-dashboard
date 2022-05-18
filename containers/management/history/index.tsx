import type { NextPage } from "next";
import Layout from "../../../components/layout";
import { AiOutlineDownload } from "react-icons/ai";

const History = () => {
  return (
    <Layout title="히스토리">
      <div className="grid h-full">
        <div className="w-full rounded-md bg-white p-10 shadow-md">
          <div className="flex items-center justify-start space-x-2">
            <select
              id="countries"
              className="mr-6 w-1/3 rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-2 focus:border-gray-700"
            >
              <option value="" selected>
                파일 목록 리스트
              </option>
            </select>
            <button
              type="submit"
              className="rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
            >
              보기
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2 px-8 text-sm font-medium text-white hover:bg-blue-800 "
            >
              <AiOutlineDownload className="text-2xl" />
              <span>다운로드</span>
            </button>
          </div>

          <div className="mt-10 h-[calc(100%-80px)] w-full overflow-auto rounded-md border-[1px] border-gray-400 p-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
            omnis fugiat. Ducimus esse quisquam, sit dicta blanditiis cumque
            debitis at qui libero neque distinctio vitae. Quam quibusdam
            consequatur deleniti delectus.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
