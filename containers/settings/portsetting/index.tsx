import type { NextPage } from "next";
import BoardTitle from "@components/common/BoardTitle";
import StatusInfo from "@components/common/StatusInfo";
import Layout from "@components/layout";
import LowPortSetting from "./fragment/LowPortSetting";
import UpPortSetting from "./fragment/UpPortSetting";
import { useRecoilState } from "recoil";
import { upPortsState } from "recoil/atom";
import { downPortsState } from "recoil/atom";
import updatePortSetting from "@api/setting/modifyPort";
import useDownPortList from "@api/setting/downPortList";

const PortSetting = () => {
  const [upPorts, setUpPorts] = useRecoilState(upPortsState);
  const [downPorts, setDownPorts] = useRecoilState(downPortsState);
  const { downPortList, isLoading, isError }: any = useDownPortList();
  let upPortJson = [{
    id: "",
    port: "",
  }]
  let downPortJson = [{
    id: "",
    name: "",
    model: "",
    type: "",
    baudrate: "",
    parity: "",
    databits: "",
    stopbits: "",
    deviceId: "",
  }]
  let isUpSuccess = true;
  let isDownSuccess = true;

  function refreshPage() {
    window.location.reload();
  }

  const upPortPut = () => {
    let i = 1;
    isUpSuccess = true;
    upPorts?.map((u) => {
      if(u.id !== "-1") {
        if(Number(u.port) < 1 || Number(u.port) > 65535) {
          alert("상위 포트 설정: LISTEN PORT는 1~65535 사이 숫자를 입력하세요.");
          isUpSuccess = false;
        } else {
          i === 1 ? upPortJson = [{id: u.id, port: u.port}] : upPortJson = [...upPortJson, {id: u.id, port: u.port}];
          console.log(upPortJson);
          i++;
        }
      }
    })
  }

  const downPortPut = () => {
    let i = 1;
    isDownSuccess = true;
    downPorts?.map((u) => {
      if(u.id !== "-1") {
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
          if(com.id === u.id) {
            if(putArr.name === "") putArr.name = com.name;
            if(putArr.model === "") putArr.model = com.model;
            if(putArr.type === "") putArr.type = com.type;
            if(putArr.baudrate === "") putArr.baudrate = com.baudrate;
            if(putArr.parity === "") putArr.parity = com.parity;
            if(putArr.databits === "") putArr.databits = com.databits;
            if(putArr.stopbits === "") putArr.stopbits = com.stopbits;
            if(putArr.deviceId === "") putArr.deviceId = com.deviceId;
          }
        });

        if(Number(putArr.deviceId) < 0 || Number(putArr.deviceId) > 32767) {
          alert("하위 시리얼 포트 설정: DEVICE ID는 0~32767 사이 숫자를 입력하세요.");
          isDownSuccess = false;
        }
        else {
          i === 1 ? downPortJson = [putArr] : downPortJson = [...downPortJson, putArr];
          console.log(downPortJson);
        }
      }
    })
  }

  const onClickSetting = () => {
    upPortPut();
    downPortPut();
    if(isUpSuccess === true && isDownSuccess === true) {
      const putPortArr = {
        downPortList: downPortJson,
        upPortList: upPortJson,
      }
      updatePortSetting(putPortArr);
      console.log(putPortArr);
      alert("변경되었습니다.");
    } 
  }

  return (
    <Layout title="포트 설정">
      <div className="absolute top-10 right-4 flex justify-end space-x-4 py-2">
        <button
          type="submit"
          className="flex items-center space-x-2 rounded-sm border border-[#707070] bg-[#707070] p-2 px-8 text-sm font-medium text-white hover:bg-neutral-600 "
          onClick={refreshPage}
        >
          <span>이전 설정 적용</span>
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 rounded-sm border border-blue-700 bg-blue-700 p-2 px-11 text-sm font-medium text-white hover:bg-blue-800 "
          onClick={onClickSetting}
        >
          <span>설정 적용</span>
        </button>
      </div>
      <div className="grid h-full grid-rows-2 gap-y-2 pt-12">
        <div className="relative w-full rounded-md bg-white p-2 shadow-md">
          <BoardTitle subTitle="상위 포트 설정 (HSMS)" />
          <div className="relative -top-6 mr-24">
            <StatusInfo />
          </div>
          <button className="absolute right-4 top-5 rounded-sm border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none">
            포트 리셋
          </button>
          <UpPortSetting />
        </div>

        <div className="relative w-full rounded-md bg-white p-2 shadow-md">
          <BoardTitle subTitle="하위 시리얼 포트 설정 (SECS)" />
          <div className="relative -top-6 mr-24">
            <StatusInfo />
          </div>
          <button className="absolute right-4 top-5 rounded-sm border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none">
            포트 리셋
          </button>
          <LowPortSetting />
        </div>
      </div>
    </Layout>
  );
};

export default PortSetting;
