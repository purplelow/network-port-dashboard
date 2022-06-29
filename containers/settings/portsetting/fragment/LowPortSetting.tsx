import useDownPortList from "@api/setting/downPortList";
import updatePortSetting from "@api/setting/modifyPort";
import React, { useState } from "react";
import { chmod } from "fs";

export default function DownPortSetting() {
  const [checkItems, setCheckItems] = useState([{ id: "-1" }]);
  const [downPorts, setDownPorts] = useState([
    {
      id: "-1",
      name: "",
      model: "",
      type: "",
      baudrate: "",
      parity: "",
      databits: "",
      stopbits: "",
      deviceId: "",
    },
  ]);
  const { downPortList, isLoading, isError }: any = useDownPortList();
  //  console.log("downPort: ", downPortList);

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

  const updateDownPort = {
    id: "",
    name: "",
    model: "",
    type: "",
    baudrate: "",
    parity: "",
    databits: "",
    stopbits: "",
    deviceId: "",
  };

  const onChangeName = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.name = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, name: updateDownPort.name }
            : u2
        )
      );
    }
    updateDownPort.name = "";
    // console.log(downPorts);
  };

  const onChangeModel = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.model = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, model: updateDownPort.model }
            : u2
        )
      );
    }
    updateDownPort.model = "";
    // console.log(downPorts);
  };

  const onChangeType = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.type = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, type: updateDownPort.type }
            : u2
        )
      );
    }
    updateDownPort.type = "";
    // console.log(downPorts);
  };

  const onChangeBaudrate = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.baudrate = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, baudrate: updateDownPort.baudrate }
            : u2
        )
      );
    }
    updateDownPort.baudrate = "";
    console.log(downPorts);
  };

  const onChangeParity = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.parity = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, parity: updateDownPort.parity }
            : u2
        )
      );
    }
    updateDownPort.parity = "";
    console.log(downPorts);
  };

  const onChangeDatabits = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.databits = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, databits: updateDownPort.databits }
            : u2
        )
      );
    }
    updateDownPort.databits = "";
    // console.log(downPorts);
  };

  const onChangeStopbits = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.stopbits = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, stopbits: updateDownPort.stopbits }
            : u2
        )
      );
    }
    updateDownPort.stopbits = "";
    // console.log(downPorts);
  };

  const onChangeDeviceId = (e: any) => {
    updateDownPort.id = e.target.name;
    updateDownPort.deviceId = e.target.value;
    let i = 0;
    downPorts?.map((u) => (u.id !== updateDownPort.id ? (i = 1) : (i = 0)));
    if (i === 1) {
      setDownPorts([...downPorts, updateDownPort]);
    } else {
      setDownPorts(
        downPorts.map((u2) =>
          u2.id === updateDownPort.id
            ? { ...u2, deviceId: updateDownPort.deviceId }
            : u2
        )
      );
    }
    updateDownPort.deviceId = "";
    // console.log(downPorts);
  };

  const downPortPut = () => {
    downPorts?.map((u) => {
      if (u.id !== "-1") {
        let putArr = {
          id: u.id,
          name: u.name,
          model: u.model,
          type: u.type,
          baudrate: u.baudrate,
          parity: u.parity,
          databits: u.databits,
          stopbits: u.stopbits,
          deviceId: u.deviceId,
        };
        downPortList?.map((com: any, i: string) => {
          if (com.id === u.id) {
            if (putArr.name === "") putArr.name = com.name;
            if (putArr.model === "") putArr.model = com.model;
            if (putArr.type === "") putArr.type = com.type;
            if (putArr.baudrate === "") putArr.baudrate = com.baudrate;
            if (putArr.parity === "") putArr.parity = com.parity;
            if (putArr.databits === "") putArr.databits = com.databits;
            if (putArr.stopbits === "") putArr.stopbits = com.stopbits;
            if (putArr.deviceId === "") putArr.deviceId = com.deviceId;
          }
        });

        if (Number(putArr.deviceId) < 0 || Number(putArr.deviceId) > 32767) {
          alert(
            "하위 시리얼 포트 설정: DEVICE ID는 0~32767 사이 숫자를 입력하세요."
          );
        } else {
          let upPortJson = {
            downPortList: [putArr],
          };
          console.log(upPortJson);
          updatePortSetting(upPortJson);
        }
      }
    });
  };

  //checkbox
  const handleSingleCheck = (checked: boolean, id: any) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
    // console.log(checkItems);
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray = [{ id: "-1" }];
      downPortList.forEach((el: any) => idArray.push(el.id));
      setCheckItems(idArray);
      // console.log(checkItems);
    } else {
      setCheckItems([{ id: "-1" }]);
    }
  };

  return (
    <div className="relative top-10 h-[calc(100%-70px)] overflow-auto rounded-md border-[1px] border-gray-300 shadow-md">
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
              key={i}
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
                      (el) =>
                        el.id === com.id &&
                        el.name !== "" &&
                        el.name !== com.name
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.name}
                  name={com.id}
                  onChange={onChangeName}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className={
                    downPorts.some(
                      (el) =>
                        el.id === com.id &&
                        el.model !== "" &&
                        el.model !== com.model
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.model}
                  name={com.id}
                  onChange={onChangeModel}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className={
                    downPorts.some(
                      (el) =>
                        el.id === com.id &&
                        el.type !== "" &&
                        el.type !== com.type
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.type}
                  name={com.id}
                  onChange={onChangeType}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className={
                    downPorts.some(
                      (el) =>
                        el.id === com.id &&
                        el.baudrate !== "" &&
                        el.baudrate !== com.baudrate
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.baudrate}
                  name={com.id}
                  onChange={onChangeBaudrate}
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
                      (el) =>
                        el.id === com.id &&
                        el.parity !== "" &&
                        el.parity !== com.parity
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.parity}
                  name={com.id}
                  onChange={onChangeParity}
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
                      (el) =>
                        el.id === com.id &&
                        el.databits !== "" &&
                        el.databits !== com.databits
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.databits}
                  name={com.id}
                  onChange={onChangeDatabits}
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
                      (el) =>
                        el.id === com.id &&
                        el.stopbits !== "" &&
                        el.stopbits !== com.stopbits
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.stopbits}
                  name={com.id}
                  onChange={onChangeStopbits}
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
                      (el) =>
                        el.id === com.id &&
                        el.deviceId !== "" &&
                        el.deviceId !== com.deviceId
                    )
                      ? "rounded-md border-[1px] border-[#AA2222] py-1 text-center text-[#AA2222] outline-red-900"
                      : "rounded-md border-[1px] border-gray-300 py-1 text-center"
                  }
                  defaultValue={com.deviceId}
                  name={com.id}
                  onChange={onChangeDeviceId}
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
