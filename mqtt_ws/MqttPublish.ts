export default function MqttPublish(client: any, topic: any, payload: any) {
  if (client) {
    client.publish(topic, payload, { qos: 1 }, (error: any) => {
      console.log("Port Restart Publish...");
      if (error) {
        console.error(`Publish error : ${error}`);
      }
    });
  }
}
