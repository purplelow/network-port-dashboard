import { useEffect, useState } from "react";

export default function MqttPublish(client: any, topic: any, payload: any) {
  // const [publishStatus, setPublishStatus] = useState("");

  if (client) {
    client.publish(topic, payload, { qos: 1 }, (error: any) => {
      console.log("Port Restart Publish...");
      if (error) {
        // setPublishStatus(`Publish error`);
        console.log("Publish error: ", error);
      }
    });
  }

  // return {
  //   publishStatus: publishStatus,
  // };
}
