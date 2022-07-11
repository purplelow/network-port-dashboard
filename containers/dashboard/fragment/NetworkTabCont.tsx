import { useEffect, useState } from "react";

import { cls } from "@libs/utils";
import useNetworkInfo from "@api/dashBoard/networkInfo";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
// interface TabProp {
//   tabIndex: number;
// }

export default function NetworkTabCont({ ABS_URL, client }: any) {
  const topic = process.env.MQTT_TOPIC_NETWORK;
  const { networkInfoData, isLoading, isError } = useNetworkInfo(ABS_URL);
  const { mqttData, connectStatus, currentTopic } = MqttSubScribe(
    client,
    topic
  );
  const [networkInfo, setNetworkInfo]: any = useState(null);

  useEffect(() => {
    if (networkInfoData) {
      setNetworkInfo(networkInfoData);
    }
  }, [networkInfoData]);

  useEffect(() => {
    if (currentTopic.includes("/network")) {
      setNetworkInfo(mqttData);
    }
  }, [mqttData]);

  const [tabIndex, setTabIndex] = useState(0);
  const bpsSpeedA = networkInfo?.interfaces[0]?.speed! / 1000000;
  const bpsSpeedB = networkInfo?.interfaces[1]?.speed! / 1000000;

  const statusImgA = () => {
    let result;
    if (
      networkInfo?.interfaces[0].admin_status === 1 &&
      networkInfo?.interfaces[0].oper_status === 1
    ) {
      result = "bg-lanConnected";
    } else if (
      networkInfo?.interfaces[0].admin_status === 1 &&
      networkInfo?.interfaces[0].oper_status === 2
    ) {
      result = "bg-lanDisconnected";
    } else {
      result = "bg-lanInactive";
    }
    return result;
  };
  const statusImgB = () => {
    let result;
    if (
      networkInfo?.interfaces[1]?.admin_status === 1 &&
      networkInfo?.interfaces[1]?.oper_status === 1
    ) {
      result = "bg-lanConnected";
    } else if (
      networkInfo?.interfaces[1]?.admin_status === 1 &&
      networkInfo?.interfaces[1]?.oper_status === 2
    ) {
      result = "bg-lanDisconnected";
    } else {
      result = "bg-lanInactive";
    }
    return result;
  };

  return (
    <div className="h-[calc(100%-20px)] w-full pt-3">
      <ul className="flex divide-x divide-gray-200 text-center text-sm font-medium text-gray-500">
        <li className="">
          <button
            onClick={() => {
              setTabIndex(0);
            }}
            className={cls(
              "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
              tabIndex === 0
                ? "bg-blue-800 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            )}
            aria-current="page"
          >
            {networkInfo?.interfaces[0].name ?? "LAN -"}
          </button>
        </li>
        <li className="">
          <button
            onClick={() => {
              setTabIndex(1);
            }}
            className={cls(
              "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
              tabIndex === 1
                ? "bg-blue-800 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            )}
          >
            {networkInfo?.interfaces[1]?.name ?? "LAN -"}
          </button>
        </li>
      </ul>
      <div className="h-[calc(100%-50px)] w-full">
        {tabIndex === 0 ? (
          <div className="h-full w-full rounded-b-lg border bg-white p-2 shadow-sm">
            <div className="mx-auto flex w-[98%] items-center justify-start space-x-4 border-b-[1px] border-gray-200 p-2 pb-4">
              <h5
                className={cls(
                  "h-[41px] bg-[left_bottom] bg-no-repeat pl-16 text-xl font-bold leading-[41px] text-gray-900",
                  statusImgA()
                )}
              >
                {networkInfo?.interfaces[0].name}
              </h5>
              <span>{bpsSpeedA ? `${bpsSpeedA}Mbps` : ""}</span>
            </div>

            <div className="mx-auto w-[98%] py-4 pl-2">
              <ul
                role="list"
                className="grid grid-cols-6 gap-y-2 align-middle text-sm"
              >
                <li className="font-bold text-gray-700">IP</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[0].addresses[0].address}
                </li>
                <li className="font-bold text-gray-700">NETMASK</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[0].addresses[0].mask}
                </li>
                <li className="font-bold text-gray-700">MAC</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[0].mac_address}
                </li>
                <li className="font-bold text-gray-700">GATEWAY</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[0].addresses[0].gateway}
                </li>
              </ul>

              <ul
                role="list"
                className="grid grid-cols-7 gap-y-2 pt-10 align-middle text-sm"
              >
                <li className="pr-6 text-right font-bold text-gray-700">RX</li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    BYTES
                  </span>
                  {networkInfo?.interfaces[0].statistics.rx_bytes}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    DISCARDS
                  </span>
                  {networkInfo?.interfaces[0].statistics.rx_discards}
                </li>
                <li className="font-bold text-gray-700"></li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    ERRORS
                  </span>
                  {networkInfo?.interfaces[0].statistics.rx_errors}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    PACKETS
                  </span>
                  {networkInfo?.interfaces[0].statistics.rx_packets}
                </li>
              </ul>

              <ul
                role="list"
                className="grid grid-cols-7 gap-y-2 pt-10 align-middle text-sm"
              >
                <li className="pr-6 text-right font-bold text-gray-700">TX</li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    BYTES
                  </span>
                  {networkInfo?.interfaces[0].statistics.tx_bytes}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    DISCARDS
                  </span>
                  {networkInfo?.interfaces[0].statistics.tx_discards}
                </li>
                <li className="font-bold text-gray-700"></li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    ERRORS
                  </span>
                  {networkInfo?.interfaces[0].statistics.tx_errors}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    PACKETS
                  </span>
                  {networkInfo?.interfaces[0].statistics.tx_packets}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="h-full w-full rounded-b-lg border bg-white p-2 shadow-sm">
            <div className="mx-auto flex w-[98%] items-center justify-start space-x-4 border-b-[1px] border-gray-200 p-2 pb-4">
              <h5
                className={cls(
                  "h-[41px] bg-[left_bottom] bg-no-repeat pl-16 text-xl font-bold leading-[41px] text-gray-900",
                  statusImgB()
                )}
              >
                {networkInfo?.interfaces[1].name}
              </h5>
              <span>{bpsSpeedB ? `${bpsSpeedB}Mbps` : ""}</span>
            </div>

            <div className="mx-auto w-[98%] py-4 pl-2">
              <ul
                role="list"
                className="grid grid-cols-6 gap-y-2 align-middle text-sm"
              >
                <li className="font-bold text-gray-700">IP</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[1].addresses[0].address}
                </li>
                <li className="font-bold text-gray-700">NETMASK</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[1].addresses[0].mask}
                </li>
                <li className="font-bold text-gray-700">MAC</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[1].mac_address}
                </li>
                <li className="font-bold text-gray-700">GATEWAY</li>
                <li className="col-span-2 pl-1 text-gray-600">
                  {networkInfo?.interfaces[1].addresses[0].gateway}
                </li>
              </ul>

              <ul
                role="list"
                className="grid grid-cols-7 gap-y-2 pt-10 align-middle text-sm"
              >
                <li className="pr-6 text-right font-bold text-gray-700">RX</li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    BYTES
                  </span>
                  {networkInfo?.interfaces[1].statistics.rx_bytes}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    DISCARDS
                  </span>
                  {networkInfo?.interfaces[1].statistics.rx_discards}
                </li>
                <li className="font-bold text-gray-700"></li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    ERRORS
                  </span>
                  {networkInfo?.interfaces[1].statistics.rx_errors}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    PACKETS
                  </span>
                  {networkInfo?.interfaces[1].statistics.rx_packets}
                </li>
              </ul>

              <ul
                role="list"
                className="grid grid-cols-7 gap-y-2 pt-10 align-middle text-sm"
              >
                <li className="pr-6 text-right font-bold text-gray-700">TX</li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    BYTES
                  </span>
                  {networkInfo?.interfaces[1].statistics.tx_bytes}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    DISCARDS
                  </span>
                  {networkInfo?.interfaces[1].statistics.tx_discards}
                </li>
                <li className="font-bold text-gray-700"></li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    ERRORS
                  </span>
                  {networkInfo?.interfaces[1].statistics.tx_errors}
                </li>
                <li className="col-span-3 text-gray-600">
                  <span className="mr-1 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                    PACKETS
                  </span>
                  {networkInfo?.interfaces[1].statistics.tx_packets}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
