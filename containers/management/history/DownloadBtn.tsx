import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

export default function DonwloadButton({ fileName }: any) {
  const handleDownload = () => {
    axios({
      url: `http://192.168.123.190:8080/api/history/downloadLogFile/${fileName}`,
      method: "GET",
      responseType: "blob",
    })
      .then((res) => {
        const blob = new Blob([res.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileObjectUrl;
        link.download = `${fileName}`;
        document.body.appendChild(link);
        link.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(fileObjectUrl);
        }, 50000);
        link.remove();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <button
      onClick={handleDownload}
      type="submit"
      className="flex items-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2 pr-8 pl-6 text-sm font-medium text-white hover:bg-blue-800 "
    >
      <AiOutlineDownload className="text-2xl" />
      <span>다운로드</span>
    </button>
  );
}
