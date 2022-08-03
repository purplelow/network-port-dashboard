import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export default function MqttMessage(client: any) {
  const [currentTopic, setCurrentTopic] = useState("");
  const [mqttData, setMqttData]: any = useState({});
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

        if (mqttWsData.app_service?.id === "1") setPortRD_a(() => mqttWsData);
        if (mqttWsData.app_service?.id === "2") setPortRD_b(() => mqttWsData);
        if (mqttWsData.app_service?.id === "3") setPortRD_c(() => mqttWsData);
        if (mqttWsData.app_service?.id === "4") setPortRD_d(() => mqttWsData);
        if (mqttWsData.app_service?.id === "5") setPortRD_e(() => mqttWsData);
        if (mqttWsData.app_service?.id === "6") setPortRD_f(() => mqttWsData);
        if (mqttWsData.app_service?.id === "7") setPortRD_g(() => mqttWsData);
        if (mqttWsData.app_service?.id === "8") setPortRD_h(() => mqttWsData);

        if (mqttWsData.sub_device?.id === "1") setPortRD_a(() => mqttWsData);
        if (mqttWsData.sub_device?.id === "2") setPortRD_b(() => mqttWsData);
        if (mqttWsData.sub_device?.id === "3") setPortRD_c(() => mqttWsData);
        if (mqttWsData.sub_device?.id === "4") setPortRD_d(() => mqttWsData);
        if (mqttWsData.sub_device?.id === "5") setPortRD_e(() => mqttWsData);
        if (mqttWsData.sub_device?.id === "6") setPortRD_f(() => mqttWsData);
        if (mqttWsData.sub_device?.id === "7") setPortRD_g(() => mqttWsData);
        if (mqttWsData.sub_device?.id === "8") setPortRD_h(() => mqttWsData);

        setMqttData(() => mqttWsData);
        setCurrentTopic(() => topic);
        // await setMqttData(({ mqttData }: any) => ({
        //   ...mqttData,
        //   sub_device: {
        //     id: mqttWsData.sub_device.id,
        //     status: mqttWsData.sub_device.status,
        //   },
        // }));
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
    // dwonPortDown: dwonPortDown,
    // dwonPortReady: dwonPortReady,
  };
}
