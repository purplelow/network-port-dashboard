import mqtt from "mqtt";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { mqttUrl } from "recoil/atom";

export default function MqttWSReactService(clientId: string) {
  const host = useRecoilValue(mqttUrl);
  const [client, setClient]: any = useState(null);

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

  useEffect(() => {
    console.log("MQTT WS CONNECT !");
    setClient(mqtt.connect(host, options));
  }, [host]);

  return {
    client: client,
  };
}
