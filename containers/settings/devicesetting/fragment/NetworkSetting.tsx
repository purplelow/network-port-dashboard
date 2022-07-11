import useNetworkInfo from "@api/dashBoard/networkInfo";
import updateNetwork from "@api/setting/updateNetwork";
import BoardTitle from "@components/common/BoardTitle";
import { cls } from "@libs/utils";
import { useEffect, useRef, useState } from "react";
import { FieldErrors, useForm, useFieldArray } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// interface NeworkForm {
//   gateway: string;
//   ipaddress: string;
//   name: string;
//   netmask: string;
// }

export default function NetworkSetting({ ABS_URL }: any) {
  21;
  const { register, handleSubmit, watch, formState } = useForm();
  const { errors } = formState;
  const { networkInfoData } = useNetworkInfo(ABS_URL);
  const networkData = networkInfoData?.interfaces;

  const defaultName = networkInfoData?.interfaces[0].name;
  const defaultAddress = networkInfoData?.interfaces[0].addresses[0].address;
  const defaultMask = networkInfoData?.interfaces[0].addresses[0].mask;
  const defaultGateway = networkInfoData?.interfaces[0].addresses[0].gateway;
  const [data, setData]: any = useState([
    {
      name: "",
      ipaddress: "",
      netmask: "",
      gateway: "",
    },
  ]);
  useEffect(() => {
    setData([
      {
        name: defaultName,
        ipaddress: defaultAddress,
        netmask: defaultMask,
        gateway: defaultGateway,
      },
    ]);
  }, [networkInfoData]);

  const setJSONData = (e: any) => {
    let i = e.target.id;
    const networkName = `LAN${Number(i) + 1}`;
    let setTF = false;
    data.map((t: any) =>
      t.name === networkName ? (setTF = true) : (setTF = false)
    );
    const netName = e.target.name;
    if (netName.includes("ipaddress")) {
      if (setTF) {
        setData(
          data.map((asis: any) =>
            asis.name === networkName
              ? { ...asis, ipaddress: e.target.value }
              : asis
          )
        );
      } else {
        const newItem = {
          name: networkName,
          ipaddress: e.target.value,
          netmask: "",
          gateway: "",
        };
        setData([...data, newItem]);
      }
    } else if (netName.includes("netmask")) {
      if (setTF) {
        setData(
          data.map((asis: any) =>
            asis.name === networkName
              ? { ...asis, netmask: e.target.value }
              : asis
          )
        );
      } else {
        const newItem = {
          name: networkName,
          ipaddress: "",
          netmask: e.target.value,
          gateway: "",
        };
        setData([...data, newItem]);
      }
    } else if (netName.includes("gateway")) {
      if (setTF) {
        setData(
          data.map((asis: any) =>
            asis.name === networkName
              ? { ...asis, gateway: e.target.value }
              : asis
          )
        );
      } else {
        const newItem = {
          name: networkName,
          ipaddress: "",
          netmask: "",
          gateway: e.target.value,
        };
        setData([...data, newItem]);
      }
    }
  };

  console.log("data?? : ", data);

  const onValid = () => {
    const neworkInfoJson = {
      networkInfos: data,
    };
    updateNetwork({ ABS_URL }, neworkInfoJson);

    console.log("결과 JSON {} : ", neworkInfoJson);
  };

  const onInvalid = () => {
    toast.warning("올바른 ip 주소를 입력해 주세요.", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
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
          {networkData?.map((networkData: any, i: any) => {
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
                    defaultValue={networkData.addresses[0].address ?? ""}
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
                    defaultValue={networkData.addresses[0].mask ?? ""}
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
                    defaultValue={networkData.addresses[0].gateway ?? ""}
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
          })}
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
