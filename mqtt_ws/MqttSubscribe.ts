import { useEffect, useState } from "react";

export default function MqttSubScribe(client: any, topic: any) {
  const [mqttData, setMqttDate] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connecting...");
  const [currentTopic, setCurrentTopic] = useState("");
  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        client.subscribe(topic, {
          qos: 0,
        });
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
        const mqttCpuData: any = JSON.parse(message.toString());
        // console.log("Received Message: ", mqttCpuData);
        setMqttDate(mqttCpuData);
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
