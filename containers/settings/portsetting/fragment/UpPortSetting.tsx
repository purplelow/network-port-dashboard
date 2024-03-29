import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  upPortRecoilData,
  upPortsCheckList,
  upPortsState,
  portSettingValueChanged,
} from "recoil/atom";
import { useForm } from "react-hook-form";

import useUpPortList from "@api/setting/upPortList";
import updatePortSetting from "@api/setting/modifyPort";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
import MqttMessage from "mqtt_ws/MqttMessage";
import { toast } from "react-toastify";
import axios from "axios";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

export default function UpPortSetting({ ABS_URL, client, mountPort }: any) {
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  }: any = useForm();
  const topic = process.env.MQTT_TOPIC_UPPORT;
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

    portResD_a,
    portResD_b,
    portResD_c,
    portResD_d,
    portResD_e,
    portResD_f,
    portResD_g,
    portResD_h,
  }: any = MqttMessage(client);

  const [checkItems, setCheckItems] = useRecoilState(upPortsCheckList);
  const [upPorts, setUpPorts]: any = useRecoilState(upPortsState);
  const { upPortListData, isLoading, isError }: any = useUpPortList(ABS_URL);
  const UPPORTLIST_API_URL = process.env.NEXT_PUBLIC_GET_UPPORT_LIST;
  const [upPortList, setUpPortList]: any = useState([]);
  const [isChanged, setIsChanged] = useRecoilState(portSettingValueChanged);

  useEffect(() => {
    axios
      .get(`${ABS_URL}${UPPORTLIST_API_URL}`)
      .then((res) => setUpPortList(res.data))
      .catch((e) => console.error(e));
  }, [upPortListData, mountPort]);

  useEffect(() => {
    if (portRD_a.app_service) {
      const changePortId = portRD_a?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_a.app_service?.status,
              }
            : t
        )
      );
    }
    if (portRD_b.app_service) {
      const changePortId = portRD_b?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_b.app_service?.status,
              }
            : t
        )
      );
    }
    if (portRD_c.app_service) {
      const changePortId = portRD_c?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_c.app_service?.status,
              }
            : t
        )
      );
    }
    if (portRD_d.app_service) {
      const changePortId = portRD_d?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_d.app_service?.status,
              }
            : t
        )
      );
    }
    if (portRD_e.app_service) {
      const changePortId = portRD_e?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_e.app_service?.status,
              }
            : t
        )
      );
    }
    if (portRD_f.app_service) {
      const changePortId = portRD_f?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_f.app_service?.status,
              }
            : t
        )
      );
    }
    if (portRD_g.app_service) {
      const changePortId = portRD_g?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_g.app_service?.status,
              }
            : t
        )
      );
    }
    if (portRD_h.app_service) {
      const changePortId = portRD_h?.app_service?.id;
      setUpPortList((upPortList: any) =>
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_h.app_service?.status,
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

  useEffect(() => {
    if (
      portResD_a.message === "Success" &&
      portResD_a.orig_request?.svc_id === 1
    ) {
      const portId = portResD_a.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_a]);
  useEffect(() => {
    if (
      portResD_b.message === "Success" &&
      portResD_b.orig_request?.svc_id === 2
    ) {
      const portId = portResD_b.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_b]);
  useEffect(() => {
    if (
      portResD_c.message === "Success" &&
      portResD_c.orig_request?.svc_id === 3
    ) {
      const portId = portResD_c.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_c]);
  useEffect(() => {
    if (
      portResD_d.message === "Success" &&
      portResD_d.orig_request?.svc_id === 4
    ) {
      const portId = portResD_d.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_d]);
  useEffect(() => {
    if (
      portResD_e.message === "Success" &&
      portResD_e.orig_request?.svc_id === 5
    ) {
      const portId = portResD_e.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_e]);
  useEffect(() => {
    if (
      portResD_f.message === "Success" &&
      portResD_f.orig_request?.svc_id === 6
    ) {
      const portId = portResD_f.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_f]);
  useEffect(() => {
    if (
      portResD_g.message === "Success" &&
      portResD_g.orig_request?.svc_id === 7
    ) {
      const portId = portResD_g.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_g]);
  useEffect(() => {
    if (
      portResD_h.message === "Success" &&
      portResD_h.orig_request?.svc_id === 8
    ) {
      const portId = portResD_h.orig_request?.svc_id;
      toast.success(`${portId}번 포트 리셋`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [portResD_h]);

  const upPortLength = () => {
    let i = 0;
    upPortList?.map(() => (i += 1));
    return i;
  };

  const statusColor = (status: string) => {
    let result;
    if (status === "ERROR")
      result = "inline-block h-3 w-3 rounded-full bg-[#DE1717]";
    else if (status === "READY")
      result = "inline-block h-3 w-3 rounded-full bg-[#FFAB4A]";
    else if (status === "RUN")
      result = "inline-block h-3 w-3 rounded-full bg-[#319500]";
    else if (status === "DOWN")
      result = "inline-block h-3 w-3 rounded-full bg-[#1694D5]";
    else if (status === "UNUSED")
      result = "inline-block h-3 w-3 rounded-full bg-[#B5B5B5]";
    else result = "";
    return result;
  };

  // 설정 적용(상위 포트 설정)
  const onChangePort = (e: any) => {
    setIsChanged(true);
    const updateUpPort = {
      id: e.target.id,
      port: e.target.value.trim(),
    };
    let i = 1;
    upPorts?.map((el: any) => (el.id !== e.target.id ? null : (i = 0)));
    if (i === 1) {
      setUpPorts([...upPorts, updateUpPort]);
    } else {
      setUpPorts(
        upPorts?.map((el: any) =>
          el.id === e.target.id ? { ...el, port: e.target.value.trim() } : el
        )
      );
    }
  };

  //checkbox
  const handleSingleCheck = (checked: boolean, id: any, key: any) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray = ["-1"];
      upPortList.forEach((el: any) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems(["-1"]);
    }
  };

  return (
    <div className="relative top-5 h-[calc(100%-45px)] overflow-auto rounded-sm border-[1px] border-gray-300 shadow-md">
      <form>
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-blue-100 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-2">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={
                      checkItems.length - 1 === upPortLength() ? true : false
                    }
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-1 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-1 text-right">
                Serial Port
              </th>
              <th scope="col" className="px-6 py-1 text-center">
                Listen Port
              </th>
              <th scope="col" className="px-6 py-1 text-right">
                T3 (HSMS)
              </th>
              <th scope="col" className="px-6 py-1 text-right">
                T5 (HSMS)
              </th>
              <th scope="col" className="px-6 py-1 text-right">
                T6 (HSMS)
              </th>
              <th scope="col" className="px-6 py-1 text-right">
                T7 (HSMS)
              </th>
              <th scope="col" className="px-6 py-1 text-right">
                T8 (HSMS)
              </th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {upPortList?.map((com: any, i: string) => (
              <tr
                className={
                  checkItems.includes(com.id)
                    ? "border-b bg-[#FFACAC] bg-opacity-20 hover:bg-[#FFACAC] hover:bg-opacity-25"
                    : "border-b bg-white hover:bg-gray-50"
                }
                key={i}
              >
                <td className="w-4 px-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      onChange={(e) =>
                        handleSingleCheck(e.target.checked, com.id, i)
                      }
                      checked={checkItems.includes(com.id) ? true : false}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-1 text-center">
                  <span className={statusColor(com.status)}></span>
                </td>
                <td className="px-6 py-1 text-right">{com.deviceName}</td>
                <td className="px-6 py-1 text-center">
                  <input
                    {...register(`port${com.id}`, {
                      required: "포트를 입력하세요.",
                      onChange: (e: any) => {
                        onChangePort(e);
                      },
                      // validate: {
                      //   duplicatePort: (value: any) => {
                      //     const [asis] = getValues(`port${com.id}`);
                      //     const valPort = asis.some(
                      //       (el: any) => el.port === value
                      //     );
                      //     return valPort && "포트는 중복될 수 없습니다.";
                      //   },
                      // },
                    })}
                    // name="port"
                    id={com.id}
                    type="number"
                    min="1"
                    max="65535"
                    className={
                      isChanged === true
                        ? upPorts.some(
                            (el: any) =>
                              el.id === com.id && el.port !== com.port
                          )
                          ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                          : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                        : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                    }
                    defaultValue={com.port}
                  />
                  {/* {errors.port[com.id] && (
                    <p className="absolute -bottom-4 min-w-[220px] text-xs italic text-red-500">
                      {errors.port[com.id].message}
                    </p>
                  )} */}
                </td>
                <td className="px-6 py-1 text-right">{com.t3}</td>
                <td className="px-6 py-1 text-right">{com.t5}</td>
                <td className="px-6 py-1 text-right">{com.t6}</td>
                <td className="px-6 py-1 text-right">{com.t7}</td>
                <td className="px-6 py-1 text-right">{com.t8}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
