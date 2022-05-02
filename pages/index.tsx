import type { NextPage } from "next";
import Layout from "../components/layout/layout";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const chartState: any = {
  series: [76, 67, 61, 90],
  options: {
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "left",
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName: any, opts: any) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  },
};
const Home: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <div className="grid h-full grid-flow-col grid-cols-2 grid-rows-4 gap-4">
        <div className="row-span-2 h-full bg-white p-2 shadow-md">
          네트워크 정보
        </div>
        <div className="h-full bg-white p-2 shadow-md">상위 통신</div>
        <div className="h-full bg-white p-2 shadow-md">하위 통신</div>
        <div className="row-span-2 h-full bg-white p-2 shadow-md">
          시스템
          <div className="h-full">
            {/* <Bar data={data} height={40} options={options} /> */}
            <ApexChart
              options={chartState.options}
              series={chartState.series}
              type="radialBar"
              height={350}
            />
          </div>
        </div>
        <div className="row-span-2 h-full bg-white p-2 shadow-md">
          시스템 정보
        </div>
      </div>
    </Layout>
  );
};
export default Home;
