import { useState } from "react";
import MqttComponent from "./MqttComponent";

export default function MqttPublish() {
  const [data, setData]: any = useState(undefined);
  const [counter, setCounter] = useState(1);
  const [connected, setConnected] = useState("Connected");

  const publish = () => {
    const date = new Date();
    const time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const s = "TestData-" + counter + " ---- " + time;
    setData({ topic: "TOPIC1", payload: s });
    setCounter(counter + 1);
  };

  return (
    <>
      <p>State: {connected}</p>
      <button style={{ margin: "2em" }} onClick={publish}>
        Send Data
      </button>
      {data && (
        <span>
          [{data.topic}] {data.payload}
        </span>
      )}
      <MqttComponent
        subscribeTo={["TOPIC1", "TOPIC2"]}
        publish={data}
        callbacks={{
          onConnect: (isConnected = true) =>
            setConnected(isConnected ? "Connected" : "Disconnected"),
          onMessage: (topic: any, payload: any) => {
            console.log("onMessage: topic=" + topic, payload);
          },
        }}
        settings={true}
        log={true}
      />
    </>
  );
}
