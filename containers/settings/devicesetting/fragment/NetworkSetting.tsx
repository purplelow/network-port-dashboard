import { useEffect, useRef, useState } from "react";
import { FieldErrors, useForm, useFieldArray } from "react-hook-form";

import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import useNetworkInfo from "@api/dashBoard/networkInfo";
import updateNetwork from "@api/setting/updateNetwork";
import BoardTitle from "@components/common/BoardTitle";
import { cls } from "@libs/utils";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
import MqttMessage from "mqtt_ws/MqttMessage";
import { AiOutlineConsoleSql } from "react-icons/ai";
import getNetworkInfo from "@api/setting/getNetworkInfo";
import AlertAdminReq from "containers/management/systemmanage/fragment/AlertAdminReq";

interface NeworkForm {
  gateway: string;
  ipaddress: string;
  name: string;
  netmask: string;
}

export default function NetworkSetting({ ABS_URL, client }: any) {
  const [ipaddress, setIpaddress] = useState("");
  const [netmask, setNetmask] = useState("");
  const [gateway, setGateway] = useState("");
  const topic = process.env.MQTT_TOPIC_NETWORK;
  MqttSubScribe(client, topic);
  const { mqttData, currentTopic } = MqttMessage(client);
  const { networkInfoData } = getNetworkInfo(ABS_URL);
  const [networkInfo, setNetworkInfo]: any = useState(null);

  const defaultName = networkInfoData?.interfaces[0].name;
  const defaultAddress = networkInfoData?.interfaces[0].addresses[0]?.address;
  const defaultMask = networkInfoData?.interfaces[0].addresses[0]?.mask;
  const defaultGateway = networkInfoData?.interfaces[0].addresses[0]?.gateway;

  const defaultAddress_B = networkInfoData?.interfaces[1].addresses[0]?.address;
  const defaultMask_B = networkInfoData?.interfaces[1].addresses[0]?.mask;
  const defaultGateway_B = networkInfoData?.interfaces[1].addresses[0]?.gateway;

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (networkInfoData) {
      setNetworkInfo(networkInfoData);
      setIpaddress(networkInfoData?.interfaces[0].addresses[0]?.address);
      setNetmask(networkInfoData?.interfaces[0].addresses[0]?.mask);
      setGateway(networkInfoData?.interfaces[0].addresses[0]?.gateway);
    }
  }, [networkInfoData]);

  useEffect(() => {
    if (currentTopic.includes("/network")) {
      setNetworkInfo(mqttData);
    }
  }, [mqttData]);

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
      networkInfo?.interfaces[1].admin_status === 1 &&
      networkInfo?.interfaces[1].oper_status === 1
    ) {
      result = "bg-lanConnected";
    } else if (
      networkInfo?.interfaces[1].admin_status === 1 &&
      networkInfo?.interfaces[1].oper_status === 2
    ) {
      result = "bg-lanDisconnected";
    } else {
      result = "bg-lanInactive";
    }
    return result;
  };

  // const [data, setData]: any = useState();

  const putNetworkData = {
    networkInfos: [
      {
        name: defaultName,
        ipaddress: ipaddress,
        netmask: netmask,
        gateway: gateway,
      },
    ],
  };

  // const setJSONData = (e: any) => {
  //   // let i = e.target.id;
  //   // const networkName = `LAN${Number(i) + 1}`;
  //   const networkName = `LAN1`;
  //   let setTF = false;
  //   data.map((t: any) =>
  //     t.name === networkName ? (setTF = true) : (setTF = false)
  //   );
  //   const netName = e.target.name;
  //   if (netName.includes("ipaddress")) {
  //     if (setTF) {
  //       setData(
  //         data.map((asis: any) =>
  //           asis.name === networkName
  //             ? { ...asis, ipaddress: e.target.value }
  //             : asis
  //         )
  //       );
  //     } else {
  //       const newItem = {
  //         name: networkName,
  //         ipaddress: e.target.value,
  //         netmask: "",
  //         gateway: "",
  //       };
  //       setData([...data, newItem]);
  //     }
  //   } else if (netName.includes("netmask")) {
  //     if (setTF) {
  //       setData(
  //         data.map((asis: any) =>
  //           asis.name === networkName
  //             ? { ...asis, netmask: e.target.value }
  //             : asis
  //         )
  //       );
  //     } else {
  //       const newItem = {
  //         name: networkName,
  //         ipaddress: "",
  //         netmask: e.target.value,
  //         gateway: "",
  //       };
  //       setData([...data, newItem]);
  //     }
  //   } else if (netName.includes("gateway")) {
  //     if (setTF) {
  //       setData(
  //         data.map((asis: any) =>
  //           asis.name === networkName
  //             ? { ...asis, gateway: e.target.value }
  //             : asis
  //         )
  //       );
  //     } else {
  //       const newItem = {
  //         name: networkName,
  //         ipaddress: "",
  //         netmask: "",
  //         gateway: e.target.value,
  //       };
  //       setData([...data, newItem]);
  //     }
  //   }
  // };

  // const neworkInfoJson = {
  //   interfaces: [
  //     {
  //       name: defaultName,
  //       ipaddress: ipaddress ?? defaultAddress,
  //       netmask: netmask ?? defaultMask,
  //       gateway: gateway ?? defaultGateway,
  //     },
  //   ],
  // };

  const onValid = (data: any) => {
    if (data.ipaddressA?.ref?.value === "") throw new Error();
    AlertAdminReq(ABS_URL, "network", putNetworkData, defaultAddress_B);
    // updateNetwork({ ABS_URL }, data);
  };

  const onInvalid = (data: any) => {
    toast.warning("올바른 ip 주소를 입력해 주세요.", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <div className="relative w-full overflow-hidden bg-white pt-2 pl-2 pb-4 shadow-md">
      <BoardTitle subTitle="네트워크 설정" />
      <ul className="absolute top-4 right-5 flex space-x-10">
        <li className="flex items-center space-x-1 text-sm text-[#319500]">
          <div className="h-[41px] w-[49px] bg-lanConnected bg-no-repeat" />
          <span className="h-3 w-3 rounded-full bg-[#319500]"></span>
          <span>연결됨</span>
        </li>
        <li className="flex items-center space-x-1 text-sm text-[#DE1717]">
          <div className="h-[41px] w-[49px] bg-lanDisconnected bg-no-repeat" />
          <span className="h-3 w-3 rounded-full bg-[#DE1717]"></span>
          <span>연결끊김</span>
        </li>
        <li className="flex items-center space-x-1 text-sm text-[#B5B5B5]">
          <div className="h-[41px] w-[49px] bg-lanInactive bg-left-bottom bg-no-repeat" />
          <span className="h-3 w-3 rounded-full bg-[#B5B5B5]"></span>
          <span>비활성</span>
        </li>
      </ul>

      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="h-auto overflow-auto pl-8 pr-10 pt-8 pb-[70px]"
      >
        <ul className="space-y-2">
          <li className="flex min-w-[880px] items-center justify-between space-x-4 bg-blue-50 px-10 py-4">
            <div className="flex w-[20%] items-center space-x-8">
              <span className="font-bold">
                {networkInfoData?.interfaces[0].name ?? "-"}
              </span>
              <span
                className={cls(
                  "h-3 w-3 min-w-[12px] rounded-full",
                  statusImgA() === "bg-lanConnected"
                    ? "bg-[#319500]"
                    : statusImgA() === "bg-lanDisconnected"
                    ? "bg-[#DE1717]"
                    : statusImgA() === "bg-lanInactive"
                    ? "bg-[#B5B5B5]"
                    : ""
                )}
              ></span>
              <div
                className={cls(
                  "h-[41px] w-[49px] min-w-[49px] bg-lanConnected bg-no-repeat",
                  statusImgA()
                )}
              />
            </div>
            <div className="relative flex w-[30%] items-center">
              <label
                htmlFor="ipaddressA"
                className="min-w-[55px] pr-2 text-sm font-medium text-gray-900"
              >
                IP 주소
              </label>
              <input
                {...register(`ipaddressA`, {
                  pattern: {
                    value:
                      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    message: "ipv4 형식이 아닙니다.",
                  },
                  onChange: (e) => setIpaddress(e.target.value),
                  required: "ip 주소를 입력해 주세요.",
                })}
                value={ipaddress}
                id="ipaddressA"
                placeholder="IP 주소를 입력해 주세요."
                type="text"
                className={cls(
                  "w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none ",
                  errors.ipaddressA
                    ? "border-red-400 focus:border-red-600"
                    : "focus:border-[1px] focus:border-gray-700"
                )}
              />
              {errors.ipaddressA && (
                // <p className="absolute -bottom-5 left-12 mt-2 text-sm text-red-600">
                //   {errors.ipaddressA.message}
                // </p>
                <ErrorMessage
                  errors={errors}
                  name="ipaddressA"
                  render={({ message }) => (
                    <p className="absolute -bottom-5 left-12 mt-2 text-sm text-red-600">
                      {message}
                    </p>
                  )}
                />
              )}
            </div>
            <div className="relative flex w-[25%] items-center">
              <label
                htmlFor="netmaskA"
                className="pr-2 text-sm font-medium text-gray-900"
              >
                NETMASK
              </label>
              <input
                {...register(`netmaskA`, {
                  pattern: {
                    value:
                      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    message: "ipv4 형식이 아닙니다.",
                  },
                  onChange: (e) => setNetmask(e.target.value),
                  required: "netmask를 입력해 주세요.",
                })}
                value={netmask}
                id="netmaskA"
                placeholder="NETMASK를를 입력해 주세요."
                type="text"
                className={cls(
                  "w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none ",
                  errors.netmaskA
                    ? "border-red-400 focus:border-red-500"
                    : "focus:border-[1px] focus:border-gray-700"
                )}
              />
              {errors.netmaskA && (
                // <p className="absolute -bottom-5 left-20 mt-2 text-sm text-red-600">
                //   {errors.netmaskA.message}
                // </p>
                <ErrorMessage
                  errors={errors}
                  name="netmaskA"
                  render={({ message }) => (
                    <p className="absolute -bottom-5 left-20 mt-2 text-sm text-red-600">
                      {message}
                    </p>
                  )}
                />
              )}
            </div>
            <div className="relative flex w-[25%] items-center">
              <label
                htmlFor="gatewayA"
                className="pr-2 text-sm font-medium text-gray-900"
              >
                GATEWAY
              </label>
              <input
                {...register(`gatewayA`, {
                  pattern: {
                    value:
                      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    message: "ipv4 형식이 아닙니다.",
                  },
                  onChange: (e) => setGateway(e.target.value),
                  // required: "gateway를 입력해 주세요.",
                })}
                value={gateway}
                id="gatewayA"
                placeholder="GATEWAY를 입력해 주세요."
                type="text"
                className={cls(
                  "w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none ",
                  errors.gatewayA
                    ? "border-red-400 focus:border-red-500"
                    : "focus:border-[1px] focus:border-gray-700"
                )}
              />
              {errors.gatewayA && (
                // <p className="absolute -bottom-5 left-20 mt-2 text-sm text-red-600">
                //   {errors.gatewayA.message}
                // </p>
                <ErrorMessage
                  errors={errors}
                  name="gatewayA"
                  render={({ message }) => (
                    <p className="absolute -bottom-5 left-20 mt-2 text-sm text-red-600">
                      {message}
                    </p>
                  )}
                />
              )}
            </div>
          </li>

          <li className="flex min-w-[880px] items-center justify-between space-x-4 bg-blue-50 px-10 py-4">
            <div className="flex w-[20%] items-center space-x-8">
              <span className="font-bold">
                {networkInfoData?.interfaces[1].name ?? "-"}
              </span>
              <span
                className={cls(
                  "h-3 w-3 min-w-[12px] rounded-full",
                  statusImgB() === "bg-lanConnected"
                    ? "bg-[#319500]"
                    : statusImgB() === "bg-lanDisconnected"
                    ? "bg-[#DE1717]"
                    : statusImgB() === "bg-lanInactive"
                    ? "bg-[#B5B5B5]"
                    : ""
                )}
              ></span>
              <div
                className={cls(
                  "h-[41px] w-[49px] min-w-[49px] bg-lanConnected bg-no-repeat",
                  statusImgB()
                )}
              />
            </div>
            <div className="relative flex w-[30%] items-center">
              <label
                htmlFor="ipaddressB"
                className="min-w-[55px] pr-2 text-sm font-medium text-gray-900"
              >
                IP 주소
              </label>
              <input
                {...register(`ipaddressB`, {
                  disabled: true,
                })}
                defaultValue={defaultAddress_B}
                id="ipaddressB"
                placeholder="IP 주소를 입력해 주세요."
                type="text"
                className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none "
              />
            </div>
            <div className="relative flex w-[25%] items-center">
              <label
                htmlFor="netmaskB"
                className="pr-2 text-sm font-medium text-gray-900"
              >
                NETMASK
              </label>
              <input
                {...register(`netmaskB`, {
                  disabled: true,
                })}
                defaultValue={defaultMask_B}
                id="netmaskB"
                placeholder="NETMASK를를 입력해 주세요."
                type="text"
                className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none "
              />
            </div>
            <div className="relative flex w-[25%] items-center">
              <label
                htmlFor="gatewayB"
                className="pr-2 text-sm font-medium text-gray-900"
              >
                GATEWAY
              </label>
              <input
                {...register(`gatewayB`, {
                  disabled: true,
                })}
                defaultValue={defaultGateway_B}
                id="gatewayB"
                placeholder="GATEWAY를 입력해 주세요."
                type="text"
                className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none "
              />
            </div>
          </li>
          {/* {networkData?.map((networkData: any, i: any) => {
            const statusImg = () => {
              let result;
              if (
                networkData.admin_status === 1 &&
                networkData.oper_status === 1
              ) {
                result = "bg-lanConnected";
              } else if (
                networkData.admin_status === 1 &&
                networkData.oper_status === 2
              ) {
                result = "bg-lanDisconnected";
              } else {
                result = "bg-lanInactive";
              }
              return result;
            };

            return (
              <li
                className="flex items-center justify-between space-x-4 bg-blue-50 px-10 py-4"
                key={i}
              >
                <div className="flex w-[20%] items-center space-x-8">
                  <span className="font-bold">{networkData.name}</span>
                  <span
                    className={cls(
                      "h-3 w-3 rounded-full",
                      statusImg() === "bg-lanConnected"
                        ? "bg-[#319500]"
                        : statusImg() === "bg-lanDisconnected"
                        ? "bg-[#DE1717]"
                        : statusImg() === "bg-lanInactive"
                        ? "bg-[#B5B5B5]"
                        : ""
                    )}
                  ></span>
                  <div
                    className={cls(
                      "h-[41px] w-[49px] bg-lanConnected bg-no-repeat",
                      statusImg()
                    )}
                  />
                </div>
                <div className="relative flex w-[30%] items-center">
                  <label
                    htmlFor={`${i}`}
                    className="pr-2 text-sm font-medium text-gray-900"
                  >
                    IP 주소
                  </label>
                  <input
                    {...register(`ipaddress.${i}`, {
                      pattern: {
                        value:
                          /^(([1-9]?\d|1\d{2}|2([0-4]\d)|25[0-5])\.){3}([1-9]?\d|1\d{2}|2([0-4]\d)|25[0-5])$/,
                        message: "ipv4 형식이 아닙니다.",
                      },
                      onChange: setJSONData,
                      required: "ip 주소를 입력해 주세요.",
                    })}
                    defaultValue={networkData.address ?? ""}
                    id={`${i}`}
                    placeholder="IP 주소를 입력해 주세요."
                    type="text"
                    className={cls(
                      "w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700",
                      errors.ipaddress?.[i]
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    )}
                  />
                  {errors.ipaddress?.[i] && (
                    <p className="absolute -bottom-5 left-12 mt-2 text-sm text-red-600">
                      {errors.ipaddress?.[i].message}
                    </p>
                  )}
                </div>
                <div className="relative flex w-[25%] items-center">
                  <label
                    htmlFor={`${i}`}
                    className="pr-2 text-sm font-medium text-gray-900"
                  >
                    NETMASK
                  </label>
                  <input
                    {...register(`netmask.${i}`, {
                      pattern: {
                        value:
                          /^(([1-9]?\d|1\d{2}|2([0-4]\d)|25[0-5])\.){3}([1-9]?\d|1\d{2}|2([0-4]\d)|25[0-5])$/,
                        message: "ipv4 형식이 아닙니다.",
                      },
                      onChange: setJSONData,
                      required: "netmask를 입력해 주세요.",
                    })}
                    defaultValue={networkData.mask ?? ""}
                    id={`${i}`}
                    placeholder="NETMASK를를 입력해 주세요."
                    type="text"
                    className={cls(
                      "w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700",
                      errors.netmask?.[i] ? "border-red-500" : ""
                    )}
                  />
                  {errors.netmask?.[i] && (
                    <p className="absolute -bottom-5 left-20 mt-2 text-sm text-red-600">
                      {errors.netmask?.[i].message}
                    </p>
                  )}
                </div>
                <div className="relative flex w-[25%] items-center">
                  <label
                    htmlFor={`${i}`}
                    className="pr-2 text-sm font-medium text-gray-900"
                  >
                    GATEWAY
                  </label>
                  <input
                    {...register(`gateway.${i}`, {
                      pattern: {
                        value:
                          /^(([1-9]?\d|1\d{2}|2([0-4]\d)|25[0-5])\.){3}([1-9]?\d|1\d{2}|2([0-4]\d)|25[0-5])$/,
                        message: "ipv4 형식이 아닙니다.",
                      },
                      onChange: setJSONData,
                      required: "gateway를 입력해 주세요.",
                    })}
                    defaultValue={networkData.gateway ?? ""}
                    id={`${i}`}
                    placeholder="GATEWAY를 입력해 주세요."
                    type="text"
                    className={cls(
                      "w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700",
                      errors.gateway?.[i] ? "border-red-500" : ""
                    )}
                  />
                  {errors.gateway?.[i] && (
                    <p className="absolute -bottom-5 left-20 mt-2 text-sm text-red-600">
                      {errors.gateway?.[i].message}
                    </p>
                  )}
                </div>
              </li>
            );
          })} */}
        </ul>

        <div className="absolute left-0 bottom-0 flex w-full justify-center pb-6">
          <button
            onClick={() => {
              setValue("ipaddressA", ipaddress);
              setValue("netmaskA", netmask);
              setValue("gatewayA", gateway);
            }}
            type="submit"
            className="rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
          >
            네트워크 설정 적용
          </button>
        </div>
      </form>
    </div>
  );
}
