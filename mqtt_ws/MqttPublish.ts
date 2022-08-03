export default function MqttPublish(
  client: any,
  topic: any,
  responseTopic: string,
  payload: any
) {
  if (client) {
    console.log("Mqtt Publish Start...");
    client.publish(
      topic,
      payload,
      {
        qos: 1,
        properties: {
          responseTopic: responseTopic,
        },
      },
      (error: any) => {
        console.log("Mqtt Publish Seccess !");
        if (error) {
          console.error(`Publish error : ${error}`);
        }
      }
    );
  }
}
