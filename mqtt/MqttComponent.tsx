import { channel } from "diagnostics_channel";
import mqtt from "mqtt";
import { useEffect, useState } from "react";
// import { Buffer } from "node:buffer";

let g_var: any = {};

const loadPreference = (m: string, v: any) => {
  if (
    localStorage.getItem(m) === null ||
    localStorage.getItem(m) === undefined
  ) {
    localStorage.setItem(m, v);
  }
  return localStorage.getItem(m);
};

export default function MqttComponent(props: any) {
  const savedAddress = loadPreference("mqtt-address", "123.4.5.6");
  const savedPort = loadPreference("mqtt-port", "1234");

  const [address, setAddress] = useState(savedAddress);
  const [port, setPort] = useState(savedPort);
  const [publish, setPublish] = useState(undefined);
  const [received, setReceived]: any = useState(undefined);
  const [error, setError] = useState(undefined);

  const onFinish = (data: any) => {
    setAddress(data.ip);
    setPort(data.port);

    localStorage.setItem("mqtt-address", data.ip);
    localStorage.setItem("mqtt-port", data.port);
  };

  useEffect(() => {
    const handleMessage = (topic: any, payload: any) => {
      let decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
      setReceived(`[${topic}]${decodedPayload}`);
      props.callbacks.onMessage(topic, decodedPayload);
    };

    const handleError = (err: any) => {
      setError(err);
      props.callbacks.onConnect(false);
    };

    const connect = () => {
      try {
        const url = `ws://${address}:${port}`;
        const mqttHandler = mqtt.connect(url);
        mqttHandler.on("connect", () => {
          props.subscribeTo.forEach((topic: any) => {
            mqttHandler.subscribe(topic);
          });
          g_var.mqtt = mqttHandler;
          props.callbacks.onCennect(true);
        });
        mqttHandler.on("disconnect", () => handleError("MQTT Disconnected"));
        mqttHandler.on("error", (err) => handleError(err));
        mqttHandler.on("message", handleMessage);
      } catch (err) {
        handleError(err);
      }
    };

    connect();
  }, []);

  useEffect(() => {
    try {
      g_var.mqtt.publish(props.publish.topic, props.publish.payload);
      setPublish(props.publish);
    } catch (err) {
      console.log("Error: cannat publish");
    }
  }, [props.publish]);

  return (
    <>
      {props.setting && (
        <form>
          <label htmlFor="">ip</label>
        </form>
      )}
    </>
  );
}
