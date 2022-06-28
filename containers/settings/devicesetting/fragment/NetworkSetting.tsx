import useNetworkInfo from "@api/dashBoard/networkInfo";
import updateNetwork from "@api/setting/updateNetwork";
import BoardTitle from "@components/common/BoardTitle";
import { cls } from "@libs/utils";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface NeworkForm {}

export default function NetworkSetting() {
  const { register, handleSubmit } = useForm();
  const { networkInfo } = useNetworkInfo();
  const networkName = networkInfo?.interfaces[0].name;
  const [ipAddr, setIpAddr] = useState();
  const [netMask, setNetMask] = useState();
  const [gateWay, setGateWay] = useState();

  const neworkInfoJson = {
    networkInfos: [
      {
        gateway: gateWay,
        ipaddress: ipAddr,
        name: networkName,
        netmask: netMask,
      },
    ],
  };

  console.log(" ?? : ", neworkInfoJson);
  const onValid = (data: NeworkForm) => {
    updateNetwork(neworkInfoJson);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <div className="relative row-span-3 w-full overflow-hidden bg-white p-2 shadow-md">
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
        className="mt-8 h-[calc(100%-110px)] overflow-auto"
      >
        <ul className="space-y-2">
          {networkInfo?.interfaces.map((networkData: any, i: number) => {
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
                className="flex items-center justify-between bg-blue-50 px-10 py-4"
                key={i}
              >
                <div className="flex w-[20%] items-center space-x-8">
                  <span className="font-bold">{networkData.name}</span>
                  <span
                    className={cls(
                      "h-3 w-3 rounded-full bg-[#319500]",
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
                <div className="flex w-[30%] items-center">
                  <span className="pr-2 text-sm font-medium text-gray-900">
                    IP 주소
                  </span>
                  <input
                    {...register("ipaddress", {
                      required: "IP 주소를 입력하세요",
                      onChange: (e) => setIpAddr(e.target.value),
                    })}
                    defaultValue={networkData.addresses[0].address}
                    type="text"
                    className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="IP 주소"
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="pr-2 text-sm font-medium text-gray-900">
                    NETMASK
                  </span>
                  <input
                    {...register("netmask", {
                      required: "NETMASK를 입력하세요",
                      onChange: (e) => setNetMask(e.target.value),
                    })}
                    defaultValue={networkData.addresses[0].mask}
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="NETMASK"
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="pr-2 text-sm font-medium text-gray-900">
                    GATEWAY
                  </span>
                  <input
                    {...register("gateway", {
                      required: "GATEWAY를 입력하세요",
                      onChange: (e) => setGateWay(e.target.value),
                    })}
                    defaultValue={networkData.addresses[0].gateway}
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="GATEWAY"
                  />
                </div>
              </li>
            );
          })}

          {/* <li className="flex items-center justify-between bg-blue-50 px-10 py-4">
                <div className="flex w-[20%] items-center space-x-8">
                  <span className="font-bold">LAN 2</span>
                  <span className="h-3 w-3 rounded-full bg-[#DE1717]"></span>
                  <div className="h-[41px] w-[49px] bg-lanDisconnected bg-no-repeat" />
                </div>
                <div className="flex w-[30%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    IP 주소
                  </span>
                  <input
                    type="text"
                    className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="IP 주소"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    NETMASK
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="NETMASK"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    GATEWAY
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="GATEWAY"
                    required
                  />
                </div>
              </li>

              <li className="flex items-center justify-between bg-blue-50 px-10 py-4">
                <div className="flex w-[20%] items-center space-x-8">
                  <span className="font-bold">LAN 3</span>
                  <span className="h-3 w-3 rounded-full bg-[#B5B5B5]"></span>
                  <div className="h-[41px] w-[49px] bg-lanInactive bg-no-repeat" />
                </div>
                <div className="flex w-[30%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    IP 주소
                  </span>
                  <input
                    type="text"
                    className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="IP 주소"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    NETMASK
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="NETMASK"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    GATEWAY
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                    placeholder="GATEWAY"
                    required
                  />
                </div>
              </li> */}
        </ul>

        <div className="absolute left-0 bottom-0 flex w-full justify-center py-2">
          <button
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
