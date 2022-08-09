import useDownPortList from "@api/setting/downPortList";
import MqttMessage from "mqtt_ws/MqttMessage";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { downPortsCheckList, downPortsState } from "recoil/atom";

export default function DownPortSetting({ ABS_URL, client }: any) {
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

  const [checkItems, setCheckItems] = useRecoilState(downPortsCheckList);
  const [downPorts, setDownPorts]: any = useRecoilState(downPortsState);
  const { downPortListData, isLoading, isError }: any =
    useDownPortList(ABS_URL);

  const [downPortList, setDownPortList]: any = useState([]);

  useEffect(() => {
    if (downPortListData) {
      setDownPortList(downPortListData);
    }
  }, [downPortListData]);
  useEffect(() => {
    if (portRD_a.sub_device) {
      const changePortId = portRD_a?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_a.sub_device?.status,
              }
            : t
        )
      );
    }
    if (portRD_b.sub_device) {
      const changePortId = portRD_b?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_b.sub_device?.status,
              }
            : t
        )
      );
    }
    if (portRD_c.sub_device) {
      const changePortId = portRD_c?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_c.sub_device?.status,
              }
            : t
        )
      );
    }
    if (portRD_d.sub_device) {
      const changePortId = portRD_d?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_d.sub_device?.status,
              }
            : t
        )
      );
    }
    if (portRD_e.sub_device) {
      const changePortId = portRD_e?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_e.sub_device?.status,
              }
            : t
        )
      );
    }
    if (portRD_f.sub_device) {
      const changePortId = portRD_f?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_f.sub_device?.status,
              }
            : t
        )
      );
    }
    if (portRD_g.sub_device) {
      const changePortId = portRD_g?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_g.sub_device?.status,
              }
            : t
        )
      );
    }
    if (portRD_h.sub_device) {
      const changePortId = portRD_h?.sub_device?.id;
      setDownPortList((downPortList: any) =>
        downPortList.map((t: any) =>
          t?.id === changePortId
            ? {
                ...t,
                status: portRD_h.sub_device?.status,
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

  const downPortLength = () => {
    let i = 0;
    // const length = upPortList.length;
    downPortList?.map(() => (i += 1));
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

  const onChangeDownPort = (e: any) => {
    let i = 1;
    downPorts?.map((u: any) => (u.id !== e.target.id ? null : (i = 0)));
    if (e.target.name === "name") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          name: e.target.value,
        };
        setDownPorts([updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, name: e.target.value } : u2
          )
        );
      }
    } else if (e.target.name === "model") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          model: e.target.value,
        };
        setDownPorts([...downPorts, updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, model: e.target.value } : u2
          )
        );
      }
    } else if (e.target.name === "type") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          type: e.target.value,
        };
        setDownPorts([...downPorts, updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, type: e.target.value } : u2
          )
        );
      }
    } else if (e.target.name === "baudrate") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          baudrate: e.target.value,
        };
        setDownPorts([...downPorts, updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, baudrate: e.target.value } : u2
          )
        );
      }
    } else if (e.target.name === "parity") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          parity: e.target.value,
        };
        setDownPorts([...downPorts, updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, parity: e.target.value } : u2
          )
        );
      }
    } else if (e.target.name === "databits") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          databits: e.target.value,
        };
        setDownPorts([...downPorts, updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, databits: e.target.value } : u2
          )
        );
      }
    } else if (e.target.name === "stopbits") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          stopbits: e.target.value,
        };
        setDownPorts([...downPorts, updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, stopbits: e.target.value } : u2
          )
        );
      }
    } else if (e.target.name === "deviceId") {
      if (i === 1) {
        const updateDownPort = {
          id: e.target.id,
          deviceId: e.target.value,
        };
        setDownPorts([...downPorts, updateDownPort]);
      } else {
        setDownPorts(
          downPorts.map((u2: any) =>
            u2.id === e.target.id ? { ...u2, deviceId: e.target.value } : u2
          )
        );
      }
    }
  };
  //checkbox
  const handleSingleCheck = (checked: boolean, id: any) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray = ["-1"];
      downPortList.forEach((el: any) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems(["-1"]);
    }
  };

  return (
    <div className="relative top-10 h-[calc(100%-70px)] overflow-auto rounded-sm border-[1px] border-gray-300 shadow-md">
      {/* <button onClick={downPortPut}>test</button> */}
      <table className="w-full text-left text-sm  text-gray-500">
        <thead className="bg-blue-100 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-2">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={
                    checkItems.length - 1 === downPortLength() ? true : false
                  }
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="checkbox-all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Status
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              Serial Port
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Name
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Model
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Type
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Baud Rate
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Parity
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Data Bits
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Stop Bits
            </th>
            <th scope="col" className="px-2 py-1 text-center">
              Device ID
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T1 (SECS)
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T2 (SECS)
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T3 (SECS)
            </th>
            <th scope="col" className="px-2 py-1 text-right">
              T4 (SECS)
            </th>
          </tr>
        </thead>
        <tbody className="input-w-s overflow-auto">
          {downPortList?.map((com: any, i: string) => (
            <tr
              className={
                checkItems.includes(com.id)
                  ? "border-b bg-[#FFACAC] bg-opacity-20 hover:bg-[#FFACAC] hover:bg-opacity-25"
                  : "border-b bg-white hover:bg-gray-50"
              }
              key={com.id}
            >
              <td className="w-4 px-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, com.id)
                    }
                    checked={checkItems.includes(com.id) ? true : false}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-table-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-2 py-1.5 text-center">
                <span className={statusColor(com.status)}></span>
              </td>
              <td className="px-2 py-1.5 text-right">{com.deviceName}</td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id && el.name && el.name !== com.name
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.name}
                  id={com.id}
                  name="name"
                  onChange={onChangeDownPort}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id && el.model && el.model !== com.model
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.model}
                  id={com.id}
                  name="model"
                  onChange={onChangeDownPort}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id && el.type && el.type !== com.type
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.type}
                  id={com.id}
                  name="type"
                  onChange={onChangeDownPort}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id &&
                        el.baudrate &&
                        el.baudrate !== com.baudrate
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.baudrate}
                  id={com.id}
                  name="baudrate"
                  onChange={onChangeDownPort}
                >
                  <option value="1200">1200</option>
                  <option value="2400">2400</option>
                  <option value="4800">4800</option>
                  <option value="9600">9600</option>
                  <option value="19200">19200</option>
                  <option value="38400">38400</option>
                  <option value="57600">57600</option>
                  <option value="115200">115200</option>
                </select>
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id &&
                        el.parity &&
                        el.parity !== com.parity
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.parity}
                  id={com.id}
                  name="parity"
                  onChange={onChangeDownPort}
                >
                  <option value="NONE">NONE</option>
                  <option value="ODD">ODD</option>
                  <option value="EVEN">EVEN</option>
                  <option value="MARK">MARK</option>
                  <option value="SPACE">SPACE</option>
                </select>
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id &&
                        el.databits &&
                        el.databits !== com.databits
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.databits}
                  id={com.id}
                  name="databits"
                  onChange={onChangeDownPort}
                >
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id &&
                        el.stopbits &&
                        el.stopbits !== com.stopbits
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.stopbits}
                  id={com.id}
                  name="stopbits"
                  onChange={onChangeDownPort}
                >
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                </select>
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="number"
                  min="0"
                  max="32767"
                  className={
                    downPorts.some(
                      (el: any) =>
                        el.id === com.id &&
                        el.deviceId &&
                        el.deviceId !== com.deviceId
                    )
                      ? "rounded-sm border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-sm border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.deviceId}
                  id={com.id}
                  name="deviceId"
                  onChange={onChangeDownPort}
                />
              </td>
              <td className="px-2 py-1.5 text-right">{com.t1}</td>
              <td className="px-2 py-1.5 text-right">{com.t2}</td>
              <td className="px-2 py-1.5 text-right">{com.t3}</td>
              <td className="px-2 py-1.5 text-right">{com.t4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
