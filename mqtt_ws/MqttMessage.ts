import { t } from "i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export default function MqttMessage(client: any) {
  const [currentTopic, setCurrentTopic] = useState("");
  const [mqttData, setMqttData]: any = useState({});
  const [portResD_a, setPortResD_a]: any = useState({});
  const [portResD_b, setPortResD_b]: any = useState({});
  const [portResD_c, setPortResD_c]: any = useState({});
  const [portResD_d, setPortResD_d]: any = useState({});
  const [portResD_e, setPortResD_e]: any = useState({});
  const [portResD_f, setPortResD_f]: any = useState({});
  const [portResD_g, setPortResD_g]: any = useState({});
  const [portResD_h, setPortResD_h]: any = useState({});
  // const resettingRef = useRef(false);

  // const [wsPortData, setWsPortData] = useRecoilState(mqttPortDataRender);

  const [portRD_a, setPortRD_a]: any = useState({});
  const [portRD_b, setPortRD_b]: any = useState({});
  const [portRD_c, setPortRD_c]: any = useState({});
  const [portRD_d, setPortRD_d]: any = useState({});
  const [portRD_e, setPortRD_e]: any = useState({});
  const [portRD_f, setPortRD_f]: any = useState({});
  const [portRD_g, setPortRD_g]: any = useState({});
  const [portRD_h, setPortRD_h]: any = useState({});

  // const [upPortDown, setUpPortDown] = useState({});
  // const [upPortReady, setUpPortReady] = useState({});
  // const [dwonPortDown, setDwonPortDown]: any = useState({});
  // const [dwonPortReady, setDwonPortReady]: any = useState({});
  // const [dwonPortStatus, setDwonPortStatus]: any = useState({});

  // useEffect(() => {
  //   if (client) {
  //     client.on("message", (topic: string, message: any) => {
  //       const mqttWsData = JSON.parse(message.toString());
  //       if (mqttWsData.sub_device?.status === "DOWN")
  //         setDwonPortDown((dwonPortDown: any) => mqttWsData);
  //       if (mqttWsData.sub_device?.status === "READY")
  //         setDwonPortReady(() => mqttWsData);
  //     });
  //   }
  // }, [client]);
  useEffect(() => {
    if (client) {
      client.on("message", (topic: string, message: any) => {
        const payload = { topic, message: message.toString() };
        const mqttWsData = JSON.parse(message.toString());

        mqttWsData.app_service?.id === "1" && setPortRD_a(() => mqttWsData);
        mqttWsData.app_service?.id === "2" && setPortRD_b(() => mqttWsData);
        mqttWsData.app_service?.id === "3" && setPortRD_c(() => mqttWsData);
        mqttWsData.app_service?.id === "4" && setPortRD_d(() => mqttWsData);
        mqttWsData.app_service?.id === "5" && setPortRD_e(() => mqttWsData);
        mqttWsData.app_service?.id === "6" && setPortRD_f(() => mqttWsData);
        mqttWsData.app_service?.id === "7" && setPortRD_g(() => mqttWsData);
        mqttWsData.app_service?.id === "8" && setPortRD_h(() => mqttWsData);

        mqttWsData.sub_device?.id === "1" && setPortRD_a(() => mqttWsData);
        mqttWsData.sub_device?.id === "2" && setPortRD_b(() => mqttWsData);
        mqttWsData.sub_device?.id === "3" && setPortRD_c(() => mqttWsData);
        mqttWsData.sub_device?.id === "4" && setPortRD_d(() => mqttWsData);
        mqttWsData.sub_device?.id === "5" && setPortRD_e(() => mqttWsData);
        mqttWsData.sub_device?.id === "6" && setPortRD_f(() => mqttWsData);
        mqttWsData.sub_device?.id === "7" && setPortRD_g(() => mqttWsData);
        mqttWsData.sub_device?.id === "8" && setPortRD_h(() => mqttWsData);

        setMqttData(() => mqttWsData);
        setCurrentTopic(() => topic);

        mqttWsData.orig_request?.svc_id === 1 &&
          setPortResD_a(() => mqttWsData);
        mqttWsData.orig_request?.svc_id === 2 &&
          setPortResD_b(() => mqttWsData);
        mqttWsData.orig_request?.svc_id === 3 &&
          setPortResD_c(() => mqttWsData);
        mqttWsData.orig_request?.svc_id === 4 &&
          setPortResD_d(() => mqttWsData);
        mqttWsData.orig_request?.svc_id === 5 &&
          setPortResD_e(() => mqttWsData);
        mqttWsData.orig_request?.svc_id === 6 &&
          setPortResD_f(() => mqttWsData);
        mqttWsData.orig_request?.svc_id === 7 &&
          setPortResD_g(() => mqttWsData);
        mqttWsData.orig_request?.svc_id === 8 &&
          setPortResD_h(() => mqttWsData);
      });
    }
  }, [client]);

  // useEffect(() => {
  //   console.log(
  //     "하위 포트 DOWN @@@@@@@@@@@ : ",
  //     dwonPortDown.sub_device?.id,
  //     dwonPortDown.sub_device?.status,
  //     dwonPortDown
  //   );
  // }, [dwonPortDown, dwonPortReady]);

  return {
    mqttData: mqttData,
    currentTopic: currentTopic,
    portRD_a: portRD_a,
    portRD_b: portRD_b,
    portRD_c: portRD_c,
    portRD_d: portRD_d,
    portRD_e: portRD_e,
    portRD_f: portRD_f,
    portRD_g: portRD_g,
    portRD_h: portRD_h,

    portResD_a: portResD_a,
    portResD_b: portResD_b,
    portResD_c: portResD_c,
    portResD_d: portResD_d,
    portResD_e: portResD_e,
    portResD_f: portResD_f,
    portResD_g: portResD_g,
    portResD_h: portResD_h,
    // dwonPortDown: dwonPortDown,
    // dwonPortReady: dwonPortReady,
  };
}
