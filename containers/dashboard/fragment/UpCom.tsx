import Link from "next/link";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { AiOutlineSetting } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import ReactTooltip from "react-tooltip";
import { cls } from "@libs/utils";
import useUpPortData from "@api/dashBoard/upPort";
import { useEffect, useState } from "react";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
// UNUSED(미설정)", "DOWN(정지)", "READY(준비)", "RUN(정상)", "ERROR(에러)

export default function UpCom({ ABS_URL, client }: any) {
  const topic = process.env.MQTT_TOPIC_UPPORT;
  const { upPortInfoData, isLoading, isError }: any = useUpPortData(ABS_URL);
  const { mqttData, connectStatus, currentTopic }: any = MqttSubScribe(
    client,
    topic
  );
  const [upPortInfo, setUpPortInfo]: any = useState([]);

  useEffect(() => {
    if (upPortInfoData) {
      setUpPortInfo(upPortInfoData);
    }
  }, [upPortInfoData]);

  useEffect(() => {
    if (currentTopic.includes("/app_service")) {
      const changePortId = mqttData.app_service.id;
      setUpPortInfo(
        upPortInfo.map((t: any) =>
          t?.app_service.id === changePortId
            ? {
                app_service: {
                  ...t.app_service,
                  status: mqttData.app_service.status,
                },
              }
            : t
        )
      );
    }
  }, [mqttData]);

  return (
    <>
      <ul className="my-auto mt-4 flex h-3/5 w-full space-x-1">
        {upPortInfo?.map((com: any, i: string) => {
          const upComCondBox = () => {
            let result;
            switch (com?.app_service?.status) {
              case "READY":
                result = "border-[#FFAB4A] bg-upComReady text-[#FFAB4A]";
                break;
              case "ERROR":
                result = "border-[#DE1717] bg-upComError text-[#DE1717]";
                break;
              case "RUN":
                result = "border-[#319500] bg-upComNormal text-[#319500]";
                break;
              case "DOWN":
                result = "border-[#1694D5] bg-upComStop text-[#1694D5]";
                break;
              case "UNUSED":
                result = "border-[#B5B5B5] bg-upComNone text-[#B5B5B5]";
                break;
              default:
                result = "";
            }
            return result;
          };
          return (
            <li
              className={cls(
                "relative h-full w-[12%] border-[1px] bg-[center_top_1rem] bg-no-repeat text-sm",
                upComCondBox()
              )}
              key={i}
            >
              <ContextMenuTrigger id="contextmenu">
                <span className="absolute bottom-9 w-full text-center">
                  {(com?.app_service?.status === "READY" && "준비") ||
                    (com?.app_service?.status === "ERROR" && "에러") ||
                    (com?.app_service?.status === "RUN" && "정상") ||
                    (com?.app_service?.status === "DOWN" && "정지") ||
                    (com?.app_service?.status === "UNUSED" && "미설정")}
                </span>
                <span className="absolute bottom-2 w-full text-center">
                  {com?.app_service?.name}
                </span>
              </ContextMenuTrigger>
            </li>
          );
        })}
      </ul>

      <ContextMenu id="contextmenu">
        <MenuItem>
          <AiOutlineSetting />
          <Link href="/settings/portSetting">
            <a className="px-2.5">포트 설정</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <VscDebugRestart />
          <span>포트 리셋</span>
        </MenuItem>
      </ContextMenu>
    </>
  );
}
