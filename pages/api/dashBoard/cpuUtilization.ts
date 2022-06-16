import axios from "axios";
import useSWR from "swr";
// import dotenv from "dotenv";
// dotenv.config();
interface CpuUtilizationProps {
  detail: [
    {
      load: number;
      device_descr: string;
      id: number;
    }
  ];
  summary: {
    load: number;
  };
}
const cpuUsage_API_URL = process.env.REACT_APP_CPUUSAGE;

const fetcher = (url: string) =>
  axios
    .get<CpuUtilizationProps>(url)
    .then((res) => res.data)
    .catch((err) => console.log("Cpu data error ", err));

export default function useCpuUtilization() {
  const { data, error } = useSWR(
    `http://192.168.123.190:8080/api/dashBoard/cpuUsage`,
    fetcher
  );
  return {
    cpuUtilization: data,
    isLoading: !error && !data,
    isError: error,
  };
}
