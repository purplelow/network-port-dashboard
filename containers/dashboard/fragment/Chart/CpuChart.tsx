import dynamic from "next/dynamic";
import useCpuUtilization from "@api/dashBoard/cpuUtilization";
import MqttWSReactService from "mqtt_ws";
import { useEffect, useState } from "react";
import mqtt from "mqtt";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CpuChart({ ABS_URL, ABS_WS_URL }: any) {
  const host = ABS_WS_URL;
  const clientId = "mqtt-ws-react-" + "cpuData";

  const { cpuUtilization, isLoading, isError } = useCpuUtilization(ABS_URL);
  const { mqttCpuData } = MqttWSReactService(host, clientId);

  const defaultCpuSeries = cpuUtilization?.summary?.load ?? 0;
  const [data, setData]: any = useState();
  const cpuSeries = data?.summary?.load ?? 0;

  useEffect(() => {
    if (cpuUtilization) {
      setData(cpuUtilization);
      console.log("Rest Api Data Setting !@@@@@@@@@");
    }
  }, [cpuUtilization]);

  useEffect(() => {
    if (mqttCpuData) {
      setData(mqttCpuData);
      console.log("Mqtt Data Setting !!@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    }
  }, [data]);

  const chartState: any = {
    series: [cpuSeries | defaultCpuSeries],
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
        type: "gradient",
        gradient: {
          type: ["vertical"],
          colorStops: [
            {
              offset: 0,
              color: "#2377fd",
              opacity: 1,
            },
            {
              offset: 80,
              color: "#2377fd",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#ff4447",
              opacity: 1,
            },
          ],
        },
      },
      stroke: {
        dashArray: 2,
      },
      labels: ["CPU"],
    },
  };

  return (
    <ApexChart
      options={chartState.options}
      series={chartState.series}
      type="radialBar"
      height="100%"
    />
  );
}
