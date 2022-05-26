import { useState } from "react";

const [chartSeries, setChartSeries] = useState(10);
export const onIncrease = () => {
  if (chartSeries >= 100) {
    return 100;
  } else {
    setChartSeries(chartSeries + 10);
  }
};
export const onDecrease = () => {
  if (chartSeries <= 0) {
    return 0;
  } else {
    setChartSeries(chartSeries - 10);
  }
};

export const chartState: any = {
  series: [chartSeries],
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
            offsetY: -6,
            fontSize: "22px",
            color: undefined,
            formatter: function (val: number) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 2,
    },
    labels: ["CPU"],
  },
};
