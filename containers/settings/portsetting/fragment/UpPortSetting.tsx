import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { upPortsCheckList, upPortsState } from "recoil/atom";
import { useForm } from "react-hook-form";
import ReactTooltip from "react-tooltip";

import useUpPortList from "@api/setting/upPortList";
import updatePortSetting from "@api/setting/modifyPort";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

export default function UpPortSetting({ ABS_URL, client }: any) {
  const topic = process.env.MQTT_TOPIC_UPPORT;
  const { mqttData, connectStatus, currentTopic }: any = MqttSubScribe(
    client,
    topic
  );
  const [checkItems, setCheckItems] = useRecoilState(upPortsCheckList);
  const [upPorts, setUpPorts] = useRecoilState(upPortsState);
  const { upPortListData, isLoading, isError }: any = useUpPortList(ABS_URL);
  const [upPortList, setUpPortList]: any = useState([]);
  console.log("구독 상태 ? : ", connectStatus);
  useEffect(() => {
    if (upPortListData) {
      setUpPortList(upPortListData);
    }
  }, [upPortListData]);
  // console.log("전체 mqtt subscribe @@@@@@@@@@@@@@ ", mqttData);

  useEffect(() => {
    if (currentTopic.includes("/app_service/")) {
      // console.log(
      //   "@@@@@@ 포트리셋 MQTT DATA ? : ",
      //   currentTopic,
      //   mqttData.app_service.id,
      //   mqttData.app_service.status
      // );
      const changePortId = mqttData.app_service.id;
      setUpPortList(
        upPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: mqttData.app_service.status,
              }
            : t
        )
      );
      // console.log("포트리셋 후 Data ? : @@@@@@", upPortList);
    }
  }, [mqttData, currentTopic]);

  const upPortLength = () => {
    let i = 0;
    // const length = upPortList.length;
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
    const updateUpPort = {
      id: e.target.id,
      port: e.target.value,
    };
    let i = 1;
    upPorts?.map((el) => (el.id !== updateUpPort.id ? null : (i = 0)));
    if (i === 1) {
      setUpPorts([...upPorts, updateUpPort]);
    } else {
      setUpPorts(
        upPorts?.map((el) =>
          el.id === updateUpPort.id ? { ...el, port: updateUpPort.port } : el
        )
      );
    }
    console.log(upPorts);
  };

  //checkbox
  const handleSingleCheck = (checked: boolean, id: any, key: any) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
    console.log("체크박스 ? : ", checkItems);
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray = ["-1"];
      upPortList.forEach((el: any) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems(["-1"]);
    }
    // console.log(checkItems);
  };

  return (
    <div className="relative top-10 h-[calc(100%-70px)] overflow-auto rounded-md border-[1px] border-gray-300 shadow-md">
      {/* <button onClick={upPortPut}>test</button> */}
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
                <td className="px-6 py-1.5 text-center">
                  <span className={statusColor(com.status)}></span>
                </td>
                <td className="px-6 py-1.5 text-right">{com.deviceName}</td>
                <td className="px-6 py-1.5 text-center">
                  <input
                    name="port"
                    id={com.id}
                    type="number"
                    min="1"
                    max="65535"
                    className={
                      upPorts.some(
                        (el) => el.id === com.id && el.port !== com.port
                      )
                        ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                        : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                    }
                    defaultValue={com.port}
                    onChange={onChangePort}
                  />
                </td>
                <td className="px-6 py-1.5 text-right">{com.t3}</td>
                <td className="px-6 py-1.5 text-right">{com.t5}</td>
                <td className="px-6 py-1.5 text-right">{com.t6}</td>
                <td className="px-6 py-1.5 text-right">{com.t7}</td>
                <td className="px-6 py-1.5 text-right">{com.t8}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
