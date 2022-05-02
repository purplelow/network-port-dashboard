import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface CpuChartProps {
  cpuRate?: number;
}

export default function CpuChart({ cpuRate = 25 }: CpuChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "line",
    },
  };
  return (
    <div>
      <ApexCharts data={cpuRate} type="line" />
    </div>
  );
}
