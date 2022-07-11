import mqtt from "mqtt";
import { useEffect, useState } from "react";

export default function MqttConnect() {
  const [client, setClient]: any = useState(null);
  const [connectStatus, setConnectStatus] = useState("");
  const [payload, setPayload]: any = useState();

  const mqttConnection = (host: string) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host));
  };

  useEffect(() => {
    if (client) {
      console.log("MQTT client : ", client);
      client.on("connect", () => {
        setConnectStatus("Connected");
      });
      client.on("error", (err: any) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic: any, message: any) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  mqttConnection("ws://192.168.123.190");
}
