import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mqttPortDataRender } from "recoil/atom";

export default function MqttSubScribe(client: any, topic: any) {
  const [mqttData, setMqttData]: any = useState({});
  const [connectStatus, setConnectStatus] = useState("Connecting...");
  const [currentTopic, setCurrentTopic] = useState("");

  const [wsPortData, setWsPortData] = useRecoilState(mqttPortDataRender);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus(`Connected !`);
      });
      // connection error
      client.on("error", (err: any) => {
        setConnectStatus(`Connection error: ${err}`);
        client.end();
      });
      // reconnect
      client.on("reconnect", () => {
        setConnectStatus(`Reconnecting...`);
      });

      client.subscribe(
        topic,
        {
          qos: 1,
        },
        (error: any) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
        }
      );
      client.on("message", (topic: string, message: any) => {
        // const payload = { topic, message: JSON.parse(message.toString()) };
        const mqttWsData = JSON.parse(message.toString());
        setMqttData(() => mqttWsData);
        setWsPortData(() => mqttWsData);
        setCurrentTopic(() => topic);

        // console.log(
        //   "하위 포트 설정 mqttData : ",
        //   mqttWsData.sub_device?.id,
        //   mqttWsData.sub_device?.status
        // );
      });
    }
  }, [client]);
  // console.log("setWsPortData: @@@@@", mqttData);
  // console.log("mqttData???????", topic, "currentTopic", currentTopic);

  return {
    mqttData: mqttData,
    connectStatus: connectStatus,
    currentTopic: currentTopic,
  };
}
