import Link from "next/link";
import { cls } from "@libs/utils";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { AiOutlineSetting } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import useLowPortData from "@api/dashBoard/lowPort";
import { useEffect, useLayoutEffect, useState } from "react";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
import MqttMessage from "mqtt_ws/MqttMessage";
import ReactTooltip from "react-tooltip";
// UNUSED(미설정)", "DOWN(정지)", "READY(준비)", "RUN(정상)", "ERROR(에러)

export default function LowCom({ ABS_URL, client }: any) {
  const topic = process.env.MQTT_TOPIC_DOWNPORT;
  MqttSubScribe(client, topic);
  const {
    mqttData,
    currentTopic,
    portRD_a,
    portRD_b,
    portRD_c,
    portRD_d,
    portRD_e,
    portRD_f,
    portRD_g,
    portRD_h,
  }: any = MqttMessage(client);
  const { lowPortInfoData, isLoading, isError }: any = useLowPortData(ABS_URL);

  const [lowPortInfo, setLowPortInfo]: any = useState([]);

  const [tooltip, showTooltip] = useState(true);

  useEffect(() => {
    if (lowPortInfoData) {
      setLowPortInfo(lowPortInfoData);
    }
  }, [lowPortInfoData]);

  // useEffect(() => {
  //   if (currentTopic.includes("/sub_device")) {
  //     const changePortId = mqttData.sub_device.id;
  //     setLowPortInfo(
  //       lowPortInfo.map((t: any) =>
  //         t?.sub_device.id === changePortId
  //           ? {
  //               sub_device: {
  //                 ...t.sub_device,
  //                 status: mqttData.sub_device.status,
  //               },
  //             }
  //           : t
  //       )
  //     );
  //   }
  // }, [mqttData]);

  useEffect(() => {
    if (portRD_a.sub_device) {
      const changePortId = portRD_a?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_a.sub_device?.status,
                },
              }
            : t
        )
      );
    }
    if (portRD_b.sub_device) {
      const changePortId = portRD_b?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_b.sub_device?.status,
                },
              }
            : t
        )
      );
    }
    if (portRD_c.sub_device) {
      const changePortId = portRD_c?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_c.sub_device?.status,
                },
              }
            : t
        )
      );
    }
    if (portRD_d.sub_device) {
      const changePortId = portRD_d?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_d.sub_device?.status,
                },
              }
            : t
        )
      );
    }
    if (portRD_e.sub_device) {
      const changePortId = portRD_e?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_e.sub_device?.status,
                },
              }
            : t
        )
      );
    }
    if (portRD_f.sub_device) {
      const changePortId = portRD_f?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_f.sub_device?.status,
                },
              }
            : t
        )
      );
    }
    if (portRD_g.sub_device) {
      const changePortId = portRD_g?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_g.sub_device?.status,
                },
              }
            : t
        )
      );
    }
    if (portRD_h.sub_device) {
      const changePortId = portRD_h?.sub_device?.id;
      setLowPortInfo((lowPortInfo: any) =>
        lowPortInfo.map((t: any) =>
          t?.sub_device.id === changePortId
            ? {
                sub_device: {
                  ...t.sub_device,
                  status: portRD_h.sub_device?.status,
                },
              }
            : t
        )
      );
    }
  }, [
    portRD_a,
    portRD_b,
    portRD_c,
    portRD_d,
    portRD_e,
    portRD_f,
    portRD_g,
    portRD_h,
  ]);

  return (
    <>
      <ul className="my-auto mt-4 flex h-3/5 space-x-1">
        {lowPortInfo?.map((com: any, i: string) => {
          const upComCondBox = () => {
            let result;
            switch (com.sub_device.status) {
              case "READY":
                result = "border-[#FFAB4A] bg-lowComReady text-[#FFAB4A]";
                break;
              case "ERROR":
                result = "border-[#DE1717] bg-lowComError text-[#DE1717]";
                break;
              case "RUN":
                result = "border-[#319500] bg-lowComNormal text-[#319500]";
                break;
              case "DOWN":
                result = "border-[#1694D5] bg-lowComStop text-[#1694D5]";
                break;
              case "UNUSED":
                result = "border-[#B5B5B5] bg-lowComNone text-[#B5B5B5]";
                break;
              default:
                result = "";
            }
            return result;
          };
          return (
            <li
              key={i}
              className={cls(
                "relative h-full w-[12%] border-[1px] bg-[center_top_1rem] bg-no-repeat text-sm",
                upComCondBox()
              )}
              data-for={`downTooltip_${i}`}
              data-tip="downTooltip"
              data-delay-hide="500"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 500);
              }}
            >
              {/* <ContextMenuTrigger id="contextmenu"> */}
              <span className="absolute bottom-9 w-full text-center">
                {(com.sub_device.status === "READY" && "준비") ||
                  (com.sub_device.status === "ERROR" && "에러") ||
                  (com.sub_device.status === "RUN" && "정상") ||
                  (com.sub_device.status === "DOWN" && "정지") ||
                  (com.sub_device.status === "UNUSED" && "미설정")}
              </span>
              <span className="absolute bottom-2 w-full text-center">
                {com.sub_device.name}
              </span>
              {/* </ContextMenuTrigger> */}

              {tooltip && (
                <ReactTooltip
                  id={`downTooltip_${i}`}
                  aria-haspopup="true"
                  role="example"
                  delayHide={500}
                >
                  <ul>
                    <li>{`NAME : ${com?.sub_device?.toolTipName ?? "-"}`}</li>
                    <li>{`MODEL : ${com?.sub_device?.model ?? "-"}`}</li>
                    <li>{`TYPE : ${com?.sub_device?.type ?? "-"}`}</li>
                    <li>{`SECS-I DEVICE ID : ${
                      com?.sub_device?.secs1DeviceId ?? "-"
                    }`}</li>
                    <li>{`BAUD RATE : ${com?.sub_device?.baudrate ?? "-"}`}</li>
                    <li>{`PROTOCOL : ${com?.sub_device?.protocol ?? "-"}`}</li>
                  </ul>
                </ReactTooltip>
              )}
            </li>
          );
        })}
      </ul>
      {/* <ContextMenu id="contextmenu">
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
      </ContextMenu> */}
    </>
  );
}
