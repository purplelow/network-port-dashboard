import mqtt from "mqtt";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { mqttUrl } from "recoil/atom";

export default function MqttWSReactService(clientId: string) {
  const host = useRecoilValue(mqttUrl);
  const [client, setClient]: any = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connecting...");

  const options: object = {
    keepalive: 600,
    clientId: `${clientId} + ${Math.random().toString(16).substr(2, 8)}`,
    protocolId: "MQTT",
    protocolVersion: 5,
    clean: true,
    reconnectPeriod: 0,
    // connectTimout: 30 * 1000,
    qos: 1,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 1,
      retain: false,
    },
    rejectUnauthorized: false,
    username: "admin",
    password: "a20363a1c86fc5e23c725847ead80427",
  };

  useEffect(() => {
    console.log("MQTT WS CONNECTING...");
    setClient(mqtt.connect(host, options));
  }, [host]);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("MQTT WS CONNECT !");
        setConnectStatus(`Connected !`);
      });
      // connection error
      client.on("error", (err: any) => {
        console.log(`Connection error: ${err}`);
        setConnectStatus(`Connection error: ${err}`);
        client.end();
      });
      // reconnect
      client.on("reconnect", () => {
        console.log(`Reconnecting...`);
        setConnectStatus(`Reconnecting...`);
      });
      client.on("close", function () {
        console.log("Disconnected");
      });
    }
  }, [client]);

  return {
    client: client,
    connectStatus: connectStatus,
  };
}
