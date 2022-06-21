import useDownPortList from "@api/setting/downPortList";
import updatePortSetting from "@api/setting/modifyPort";
import React, { useState } from "react";
import { chmod } from "fs";

export default function DownPortSetting() {
  const { downPortList, isLoading, isError }: any = useDownPortList();
     console.log("downPort: ", downPortList);

    const statusColor = (status: string) => {
      let result;
      if(status === "ERROR") result = "inline-block h-3 w-3 rounded-full bg-[#DE1717]";
      else if(status === "READY") result = "inline-block h-3 w-3 rounded-full bg-[#FFAB4A]";
      else if(status === "RUN") result = "inline-block h-3 w-3 rounded-full bg-[#319500]";
      else if(status === "DOWN") result = "inline-block h-3 w-3 rounded-full bg-[#1694D5]";
      else if(status === "UNUSED") result = "inline-block h-3 w-3 rounded-full bg-[#B5B5B5]";
      else result = "";
      return result;
    }
  
  const [upPort, setUpPort] = useState();
  const onChangePort = (e: any) => {
    setUpPort(e.target.value);
    // console.log(upPort);
  }

  const downPortPut = () => {
    downPortList?.map((com: any, i: string) => {
      let downPortJson = {
        downPortList: [
          {
            baudrate: "",
            databits: "",
            deviceName: "",
            device_id: "",
            id: com.id,
            model: "",
            name: "",
            parity: "",
            stopbits: "",
          }    
        ]
      }
      console.log(downPortJson);
      updatePortSetting(downPortJson);
    })
  }

    return (
    <div className="relative top-10 h-[calc(100%-70px)] overflow-auto rounded-md border-[1px] border-gray-300 shadow-md">
      <table className="h-full w-full text-left text-sm  text-gray-500">
        <thead className="bg-blue-100 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-2">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
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
        <tbody className="input-w-s h-full overflow-auto">
          {downPortList?.map((com: any, i: string) => (
            <tr className="border-b bg-white hover:bg-gray-50" key={i}>
              <td className="w-4 px-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
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
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.name}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.model}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.type}
                />
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.baudrate}>
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
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.parity}>
                  <option value="NONE">NONE</option>
                  <option value="ODD">ODD</option>
                  <option value="EVEN">EVEN</option>
                  <option value="MARK">MARK</option>
                  <option value="SPACE">SPACE</option>
                </select>
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.databits}>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </td>
              <td className="px-2 py-1.5 text-center">
                <select
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.stopbits}>
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
                  className="rounded-md border-[1px] border-gray-300 py-1 text-center"
                  defaultValue={com.deviceId}
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
