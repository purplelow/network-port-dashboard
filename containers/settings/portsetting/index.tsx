import { constSelector, useRecoilState, useRecoilValue } from "recoil";
import {
  downPortsCheckList,
  mqttUrl,
  routerUrl,
  upPortsCheckList,
  upPortsState,
} from "recoil/atom";
import { downPortsState } from "recoil/atom";
import { ToastContainer, toast } from "react-toastify";

import Layout from "@components/layout";
import BoardTitle from "@components/common/BoardTitle";
import StatusInfo from "@components/common/StatusInfo";
import LowPortSetting from "./fragment/LowPortSetting";
import UpPortSetting from "./fragment/UpPortSetting";
import updatePortSetting from "@api/setting/modifyPort";
import useDownPortList from "@api/setting/downPortList";

import "react-toastify/dist/ReactToastify.css";
import MqttWSReactService from "mqtt_ws";
import MqttPublish from "mqtt_ws/MqttPublish";
import MqttSubScribe from "mqtt_ws/MqttSubscribe";
import { useEffect, useState } from "react";

const PortSetting = () => {
  const WS_CLIID = process.env.NEXT_PUBLIC_WS_CLIID;
  const topic = process.env.MQTT_PUBLISH_TOPIC_PORT;
  const clientId = `${WS_CLIID}`;
  const [resTopicUuid, setResTopicUuid] = useState("");
  const responseTopic = `control/${resTopicUuid}/response`;
  const ABS_URL = useRecoilValue(routerUrl);
  const { client } = MqttWSReactService(clientId);

  useEffect(() => {
    const resTopicUuid = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    };
    setResTopicUuid(resTopicUuid());
  }, []);

  MqttSubScribe(client, responseTopic);

  const upPortReset = async () => {
    if (upCheckList.length === 1) {
      toast.warning("리셋할 포트를 선택하세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    upCheckList?.map((id: any) => {
      if (id !== "-1") {
        const requestData = {
          command: "svc_control",
          action: "restart",
          svc_type: "app_service",
          svc_id: parseInt(id),
        };
        MqttPublish(client, topic, responseTopic, JSON.stringify(requestData));
      }
      setUpCheckItems(["-1"]);
    });
  };
  const downPortReset = () => {
    if (downCheckList.length === 1) {
      toast.warning("리셋할 포트를 선택하세요.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    downCheckList?.map((id: any) => {
      if (id !== "-1") {
        const requestData = {
          command: "svc_control",
          action: "restart",
          svc_type: "sub_device",
          svc_id: parseInt(id),
        };
        MqttPublish(client, topic, responseTopic, JSON.stringify(requestData));
      }
      setDownCheckItems(["-1"]);
    });
  };

  const [upPorts, setUpPorts] = useRecoilState(upPortsState);
  const [downPorts, setDownPorts] = useRecoilState(downPortsState);
  const [upCheckList, setUpCheckItems] = useRecoilState(upPortsCheckList);
  const [downCheckList, setDownCheckItems] = useRecoilState(downPortsCheckList);
  const { downPortListData, isLoading, isError }: any =
    useDownPortList(ABS_URL);

  let upPortJson = [
    {
      id: "",
      port: "",
    },
  ];
  let downPortJson = [
    {
      id: "",
      name: "",
      model: "",
      type: "",
      baudrate: "",
      parity: "",
      databits: "",
      stopbits: "",
      deviceId: "",
    },
  ];
  let isUpSuccess = true;
  let isDownSuccess = true;

  function refreshPage() {
    location.reload();
  }

  const upPortPut = () => {
    let i = 1;
    isUpSuccess = true;
    upPorts?.map((u) => {
      if (u.id !== "-1") {
        if (Number(u.port) < 1 || Number(u.port) > 65535) {
          isUpSuccess = false;
        } else {
          i === 1
            ? (upPortJson = [{ id: u.id, port: u.port }])
            : (upPortJson = [...upPortJson, { id: u.id, port: u.port }]);
          // console.log(upPortJson);
          i++;
        }
      }
    });
  };

  const downPortPut = () => {
    let i = 1;
    isDownSuccess = true;
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
        downPortListData?.map((com: any, i: string) => {
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

        if (
          putArr.deviceId === "" ||
          Number(putArr.deviceId) < 0 ||
          Number(putArr.deviceId) > 32767
        ) {
          isDownSuccess = false;
        } else {
          i === 1
            ? (downPortJson = [putArr])
            : (downPortJson = [...downPortJson, putArr]);
          // console.log(downPortJson);
        }
      }
    });
  };

  const onClickSetting = () => {
    upPortPut();
    downPortPut();
    if (isUpSuccess === true && isDownSuccess === true) {
      const putPortArr = {
        downPortList: downPortJson,
        upPortList: upPortJson,
      };
      updatePortSetting(ABS_URL, putPortArr);
    } else if (isUpSuccess === false && isDownSuccess === true) {
      toast.warning("LISTEN PORT는 1~65535 사이 숫자를 입력하세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (isUpSuccess === true && isDownSuccess === false) {
      toast.warning("DEVICE ID는 0~32767 사이 숫자를 입력하세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (isUpSuccess === false && isDownSuccess === false) {
      toast.warning(
        "LISTEN PORT는 1~65535, DEVICE ID는 0~32767 사이 숫자를 입력하세요.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    } else {
      toast.warning("설정 적용 오류", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Layout title="포트 설정">
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="absolute top-10 right-4 flex justify-end space-x-4 py-2">
        <button
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
          <button
            className="absolute right-4 top-5 rounded-sm border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none"
            onClick={upPortReset}
          >
            포트 리셋
          </button>
          <UpPortSetting ABS_URL={ABS_URL} client={client} />
        </div>

        <div className="relative w-full rounded-md bg-white p-2 shadow-md">
          <BoardTitle subTitle="하위 시리얼 포트 설정 (SECS)" />
          <div className="relative -top-6 mr-24">
            <StatusInfo />
          </div>
          <button
            className="absolute right-4 top-5 rounded-sm border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none"
            onClick={downPortReset}
          >
            포트 리셋
          </button>
          <LowPortSetting ABS_URL={ABS_URL} client={client} />
        </div>
      </div>
    </Layout>
  );
};

export default PortSetting;
