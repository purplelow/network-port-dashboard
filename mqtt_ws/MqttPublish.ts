import { useEffect, useState } from "react";

export default function MqttPublish(client: any, topic: any, payload: any) {
  const [publishStatus, setPublishStatus] = useState("");
  useEffect(() => {
    if (client) {
      client.publish(topic, payload, { qos: 1 }, (error: any) => {
        if (error) {
          setPublishStatus(`Publish error`);
          console.log("Publish error: ", error);
        }
      });
    }
  }, [client]);
  return {
    publishStatus: publishStatus,
  };
}
