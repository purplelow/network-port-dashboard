import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useMemoryUtilization from "@api/dashBoard/memoryUtilization";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MemoryChart({ ABS_URL, client }: any) {
  const topic = process.env.MQTT_TOPIC_MEMORY;
  const { memoryUtilization, isLoading, isError } =
    useMemoryUtilization(ABS_URL);
  const { mqttData, connectStatus, currentTopic } = MqttSubScribe(
    client,
    topic
  );
  const [data, setData]: any = useState();
  const memorySeries = data?.summary?.percent ?? 0;

  useEffect(() => {
    if (memoryUtilization) {
      setData(memoryUtilization);
    }
  }, [memoryUtilization]);

  useEffect(() => {
    if (currentTopic.includes("/memory")) {
      setData(mqttData);
    }
  }, [mqttData]);

  const chartState: any = {
    series: [memorySeries],
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
      labels: ["Memory"],
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
