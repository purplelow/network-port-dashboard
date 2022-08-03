export default function MqttSubScribe(client: any, topic: any) {
  if (client) {
    client.subscribe(
      topic,
      {
        qos: 1,
      },
      (error: any) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
      }
    );
  }
}
