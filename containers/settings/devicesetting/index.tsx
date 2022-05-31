import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import TimezoneSelect from "react-timezone-select";

import useModelInfo from "@api/setting/getModelInfo";
import useTimeInfo from "@api/setting/getTimeInfo";
import { cls } from "@libs/utils";
import { GmtList, UtcList } from "@libs/timeZoneList";

import Layout from "@components/layout";
import BoardTitle from "@components/common/BoardTitle";
import useNetworkInfo from "@api/dashBoard/networkInfo";
import modifySerialNumber from "@api/setting/modifySerialNumber";
import updateNetwork from "@api/setting/updateNetwork";
import { FieldErrors, useForm } from "react-hook-form";

const DeviceSetting = () => {
  const { register, handleSubmit } = useForm<ModelForm>();
  const { sysTimeInfo } = useTimeInfo();
  const { modelInfo } = useModelInfo();
  let modelNameGetValue = modelInfo?.modelName;
  let modelSerialGetValue = modelInfo?.modelSerial;
  const [modelName, setModelName] = useState(modelNameGetValue);
  const [modelSerial, setModelSerial] = useState(modelSerialGetValue);
  const { networkInfo }: any = useNetworkInfo();
  const [timeTabIndex, setTimeTabIndex] = useState(0);
  const [datetime, setDatetime] = useState(moment());

  const [tz, setTz]: any = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // useEffect(() => {
  //   const tzValue = tz.value ?? tz;
  //   setDatetime(datetime.tz(tzValue));
  // }, [tz, datetime]);

  useEffect(() => {
    setModelName(modelNameGetValue);
    setModelSerial(modelSerialGetValue);
  }, [modelNameGetValue, modelSerialGetValue]);
  // let modelInfoJson = JSON.parse(
  //   `{
  //     "modelName": "${modelName ?? modelNameGetValue}",
  //     "modelSerial": "${modelSerial ?? modelSerialGetValue}"
  //   }`
  // );
  let modelInfoJson = {
    modelName: modelName ?? modelNameGetValue,
    modelSerial: modelSerial ?? modelSerialGetValue,
  };
  const submitModelInfo = (e: any) => {
    e.preventDefault();
    modifySerialNumber(modelInfoJson);
    // axios
    //   .put(`http://192.168.123.190:8080/api/deviceSetting/modifySerialNumber`, {
    //     modelName: modelName ?? modelNameGetValue,
    //     modelSerial: modelSerial ?? modelSerialGetValue,
    //   })
    //   .then((res) => {
    //     console.log("modifySerialNumber response :::", res.data);
    //     alert("수정되었습니다.");
    //   });
  };

  let neworkInfoJson = {
    // networkInfos: [
    //   {
    //     gateway: ,
    //     ipaddress: ,
    //     name: ,
    //     netmask: ,
    //   },
    // ],
  };
  const submitUpdateNetwork = (e: any) => {
    e.preventDefault();
    updateNetwork(neworkInfoJson);
  };

  interface ModelForm {
    modelname?: string;
    serialnumber: string;
  }
  const onValid = (data: ModelForm) => {
    console.log("im valid bby");
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Layout title="장비 기본설정">
      <div className="grid h-full grid-rows-6 gap-y-2">
        <div className="w-full rounded-md bg-white shadow-md">
          <form onSubmit={handleSubmit(onValid)} className="h-full">
            <div className="flex h-full items-center justify-between px-10">
              <div className="flex w-2/5 items-center">
                <span className="pr-2 text-sm font-medium text-gray-900">
                  모델명
                </span>
                <input
                  // value={modelName ?? ""}
                  // onChange={(e) => e.target.value}
                  {...register("modelname")}
                  defaultValue={modelName ?? ""}
                  type="text"
                  className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 outline-none focus:border-[1px] focus:border-gray-700"
                  placeholder="모델명"
                  disabled
                  readOnly
                />
              </div>
              <div className="flex w-2/5 items-center">
                <span className="pr-2 text-sm font-medium text-gray-900">
                  시리얼 넘버
                </span>
                <input
                  // value={modelSerial ?? ""}
                  // onChange={(e) => setModelSerial(e.target.value)}
                  {...register("serialnumber", {
                    required: "시리얼 넘버를 입력하세요.",
                  })}
                  defaultValue={modelSerial ?? ""}
                  readOnly
                  type="text"
                  className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                  placeholder="시리얼 넘버"
                  required
                />
              </div>
              <div className="flex w-1/5 justify-end">
                <button
                  type="submit"
                  className="rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
                >
                  설정 적용
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="row-span-2 rounded-md bg-white shadow-md">
          <div className="flex items-center justify-start p-8">
            <div className="w-full">
              <ul className="flex divide-x divide-gray-200 text-center text-sm font-medium text-gray-500">
                <li className="">
                  <button
                    onClick={() => {
                      setTimeTabIndex(0);
                    }}
                    className={cls(
                      "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
                      timeTabIndex === 0
                        ? "bg-blue-800 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    )}
                    aria-current="page"
                  >
                    시간설정(수동)
                  </button>
                </li>
                {/* ==================Diva 888 제외 */}
                {/* <li className="">
                  <button
                    onClick={() => {
                      setTimeTabIndex(1);
                    }}
                    className={cls(
                      "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
                      timeTabIndex === 1
                        ? "bg-blue-800 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    )}
                  >
                    시간설정(NTP)
                  </button>
                </li> */}
              </ul>
              <div className="border border-gray-300 px-6 py-10">
                {
                  timeTabIndex === 0 ? (
                    <form className="h-full">
                      <div className="flex h-full items-end justify-between">
                        <div className="flex w-2/5 items-center">
                          <span className="pr-2 text-sm font-medium text-gray-900">
                            날짜 및 시간
                          </span>
                          <input
                            // value={sysTimeInfo?.timeInfo ?? 0}
                            // onChange={(e) => e.target.value}
                            type="text"
                            className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                            placeholder="날짜 및 시간"
                            required
                          />
                        </div>
                        <div className="flex w-2/5 items-center">
                          <span className="pr-2 text-sm font-medium text-gray-900">
                            표준 시간대
                          </span>
                          {/* <select
                          id="countries"
                          className="w-4/5 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 outline-none focus:border-[1px] focus:border-gray-700"
                        >
                          {GmtList.map((gmt, i) => (
                            <option value={gmt.zone} key={i}>
                              {gmt.zone}&nbsp;
                              {gmt.time}
                            </option>
                          ))}
                        </select> */}

                          <div className="w-4/5">
                            <TimezoneSelect value={tz} onChange={setTz} />
                          </div>

                          {/* <div className="fixed top-0 left-0 z-50 h-1/3 w-1/3 border-2 bg-slate-100">
                          <div>
                            Current Date / Time in{" "}
                            {tz.value
                              ? tz.value.split("/")[1]
                              : tz.split("/")[1]}
                            : <pre>{datetime.format("DD.MM.YY HH:mm:ss")}</pre>
                          </div>
                          <div>
                            <div>Selected Timezone:</div>
                            <pre className="tz-output">
                              {JSON.stringify(tz, null, 2)}
                            </pre>
                          </div>
                        </div> */}
                        </div>
                        <div className="flex w-1/5 justify-end">
                          <button
                            type="submit"
                            className="rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
                          >
                            설정 적용
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div>{/* <h2>시간설정 (NTP)</h2> */}</div>
                  )
                  // Diva 888 제외
                }
              </div>
            </div>
          </div>
        </div>

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

          <form className="mt-8 h-[calc(100%-110px)] overflow-auto">
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
                      <span className="font-bold">LAN 1</span>
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
                        value={networkData.addresses[0].address}
                        type="text"
                        className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                        placeholder="IP 주소"
                        required
                      />
                    </div>
                    <div className="flex w-[25%] items-center">
                      <span className="pr-2 text-sm font-medium text-gray-900">
                        NETMASK
                      </span>
                      <input
                        value={networkData.addresses[0].mask}
                        type="text"
                        className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                        placeholder="NETMASK"
                        required
                      />
                    </div>
                    <div className="flex w-[25%] items-center">
                      <span className="pr-2 text-sm font-medium text-gray-900">
                        GATEWAY
                      </span>
                      <input
                        value={networkData.addresses[0].gateway}
                        type="text"
                        className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                        placeholder="GATEWAY"
                        required
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
                설정 적용
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DeviceSetting;
