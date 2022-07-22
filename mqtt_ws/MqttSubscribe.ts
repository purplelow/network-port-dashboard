import { useEffect, useState } from "react";

export default function MqttSubScribe(client: any, topic: any) {
  const [mqttData, setMqttDate] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connecting...");
  const [currentTopic, setCurrentTopic] = useState("");
  if (client) {
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
    console.log("Subscribe ! currentTopic : ", topic);
  }
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
      client.on("message", (topic: string, message: any) => {
        const mqttWsData: any = JSON.parse(message.toString());
        // console.log("Received Message: ", mqttCpuData);
        setMqttDate(mqttWsData);
        setCurrentTopic(topic);
      });
    }
  }, [client]);

  return {
    mqttData: mqttData,
    connectStatus: connectStatus,
    currentTopic: currentTopic,
  };
}
