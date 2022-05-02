import CpuChart from "../chart/cpu-chart";

interface SysCtProps {}

export default function SystemChartBoard({}: SysCtProps) {
  return (
    <>
      <CpuChart />
    </>
  );
}
