import { useRecoilState } from "recoil";
import { mqttUrl, routerUrl } from "recoil/atom";
import absoluteUrl from "next-absolute-url";
import { useEffect } from "react";

const DEV_ENV = process.env.NEXT_PUBLIC_DEV;
const DEV_MQTT_ENV = process.env.NEXT_PUBLIC_DEV_MQTT;

export default function urlBranch() {
  const [absUrl, setAbsUrl] = useRecoilState(routerUrl);
  const [mqttWsUrl, setMqttWsUrl] = useRecoilState(mqttUrl);

  if (typeof window !== "undefined") {
    useEffect(() => {
      const { protocol, host } = absoluteUrl();
      const apiURL = `http://${host}`;
      const wsUrl = host.substring(0, host.indexOf(":")) + ":9001";

      if (DEV_ENV) setAbsUrl(DEV_ENV);
      else setAbsUrl(apiURL);

      if (DEV_MQTT_ENV) setMqttWsUrl(DEV_MQTT_ENV);
      else setMqttWsUrl(`ws://${wsUrl}`);
    }, []);
  }
}
