import mqtt from "mqtt";
import { useEffect, useState } from "react";

export default function MqttWSReactService(host: string, clientId: string) {
  const [client, setClient]: any = useState(null);
  const [mqttCpuData, setMqttCpuDate] = useState({});

  const options: object = {
    keepalive: 30,
    cleintId: clientId,
    protocolId: "MQTT",
    protocoleVersion: 5,
    clean: true,
    reconnectPeriod: 1000,
    connectTimout: 30 * 1000,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 1,
      retain: false,
    },
    rejectUnauthorized: false,
  };

  // const mqttConnect = (host: string, options: object) => {
  //   console.log("connecting... mqtt client");
  // };

  useEffect(() => {
    console.log("연결 !");
    setClient(mqtt.connect(host, options));
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("Client connectd: ", clientId);
        client.subscribe("broadcast/monitoring/localhost/system/cpu", {
          qos: 0,
        });
      });
      // connection error
      client.on("error", (err: any) => {
        console.log("Connection error: ", err);
        client.end();
      });
      // reconnect
      client.on("reconnect", () => {
        console.log("Reconnecting...");
      });
      client.on("message", (topic: string, message: any) => {
        const mqttCpuData: any = JSON.parse(message.toString());
        console.log("Received Message: ", mqttCpuData);
        // console.log("Received Message: ", message.toString());
        setMqttCpuDate(mqttCpuData);
      });
    }
  }, [client]);

  return {
    mqttCpuData: mqttCpuData,
  };
}
