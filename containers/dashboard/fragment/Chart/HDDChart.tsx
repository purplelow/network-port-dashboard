import React, { useState } from "react";
import dynamic from "next/dynamic";
import useStorageUtilization from "@api/dashBoard/storageUtilization";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function HDDChart({ ABS_URL }: any) {
  const { storageUtilization, isLoading, isError } =
    useStorageUtilization(ABS_URL);
  const hddSeries = storageUtilization?.summary.life ?? 0;

  // const [chartSeries, setChartSeries] = useState(100);
  // const onIncrease = () => {
  //   if (chartSeries >= 100) {
  //     return 100;
  //   } else {
  //     setChartSeries(chartSeries + 10);
  //   }
  // };
  // const onDecrease = () => {
  //   if (chartSeries <= 0) {
  //     return 0;
  //   } else {
  //     setChartSeries(chartSeries - 10);
  //   }
  // };

  const chartState: any = {
    series: [hddSeries],
    options: {
      chart: {
        height: "100%",
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontWeight: "normal",
              fontSize: "16px",
              color: "#454545",
              offsetY: 70,
            },
            value: {
              offsetY: -10,
              fontSize: "20px",
              color: "#464646",
              formatter: function (val: number) {
                return val + "%";
              },
            },
          },
          hollow: {
            margin: 5,
            size: "50%",
            background: "#fbfbfb",
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.1,
            },
          },
        },
      },
      fill: {
        colors: ["#2377fd"],
        type: "gradient",
        gradient: {
          gradientToColors: ["#ff4447"],
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [30],
        },
      },
      stroke: {
        dashArray: 2,
      },
      labels: ["HDD 수명"],
    },
  };

  return (
    <>
      <ApexChart
        options={chartState.options}
        series={chartState.series}
        type="radialBar"
        height="100%"
      />
    </>
  );
}
