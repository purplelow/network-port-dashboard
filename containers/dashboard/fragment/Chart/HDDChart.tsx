import dynamic from "next/dynamic";
import useStorageUtilization from "@api/dashBoard/storageUtilization";
import { useEffect, useState } from "react";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
import MqttMessage from "mqtt_ws/MqttMessage";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function HDDChart({ ABS_URL, client }: any) {
  const topic = process.env.MQTT_TOPIC_STORAGE;
  MqttSubScribe(client, topic);
  const { storageUtilization, isLoading, isError } =
    useStorageUtilization(ABS_URL);
  const { mqttData, currentTopic } = MqttMessage(client);
  const [data, setData]: any = useState();
  const hddSeries = data?.summary?.life ?? 0;

  useEffect(() => {
    if (storageUtilization) {
      setData(storageUtilization);
    }
  }, [storageUtilization]);

  useEffect(() => {
    if (currentTopic.includes("/storage")) {
      setData(mqttData);
    }
  }, [mqttData]);

  const percentTextColor: any = () => {
    if (hddSeries < 21) return "red";
    else return "#454545";
  };

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
              color: percentTextColor(),
              offsetY: 70,
            },
            value: {
              offsetY: -10,
              fontSize: "20px",
              color: percentTextColor(),
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
        colors: [
          function ({ value }: any) {
            if (value < 21) {
              return "#ff4447";
            } else {
              return "#2377fd";
            }
          },
        ],
        type: "solid",
      },
      stroke: {
        dashArray: 2,
      },
      labels: ["Disk Life"],
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
