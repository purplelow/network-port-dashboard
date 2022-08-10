import { constSelector, useRecoilState, useRecoilValue } from "recoil";
import {
  downPortsCheckList,
  mqttUrl,
  portSettingValueChanged,
  routerUrl,
  upPortRecoilData,
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
import useUpPortList from "@api/setting/upPortList";

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

  const [upPorts, setUpPorts]: any = useRecoilState(upPortsState);
  const [downPorts, setDownPorts]: any = useRecoilState(downPortsState);
  const [upCheckList, setUpCheckItems] = useRecoilState(upPortsCheckList);
  const [downCheckList, setDownCheckItems] = useRecoilState(downPortsCheckList);
  const [isChanged, setIsChanged] = useRecoilState(portSettingValueChanged);
  const { upPortListData, isUpLoading, isUpError }: any =
    useUpPortList(ABS_URL);
  const { downPortListData, isDownLoading, isDownError }: any =
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
  let isUp = true;
  let isDown = true;
  let validPort = false;
  let validDeviceId = false;

  function refreshPage() {
    window.location.reload();
  }

  const [upPortList, setUpPortList]: any = useRecoilState(upPortRecoilData);
  // const [validPort, setValidPort] = useState(false);
  const upPortPut = () => {
    let i = 1;
    upPorts?.map((u: any) => {
      if (Number(u.port) < 1 || Number(u.port) > 65535) {
        isUpSuccess = false;
      } else {
        i === 1
          ? (upPortJson = [{ id: u.id, port: u.port }])
          : (upPortJson = [...upPortJson, { id: u.id, port: u.port }]);
        isUpSuccess = true;
        i++;
      }
    });
    let portList: any = [];
    upPortListData?.map((list: any) => {
      let portData = list.port;
      upPorts?.map((u: any) => {
        list.id === u.id ? (portData = u.port) : null;
      });
      portList = [...portList, portData];
    });
    const portListSet = new Set(portList);
    portList.length !== portListSet.size
      ? (validPort = true)
      : (validPort = false);
    console.log(
      "portList, portListSet, result",
      portList,
      portListSet,
      validPort
    );

    if (upPortJson[0].id === "") isUp = false;
  };

  const downPortPut = () => {
    let i = 1;
    isDownSuccess = true;
    downPorts?.map((u: any) => {
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
        i++;
      }
    });
    if (downPortJson[0].id === "") isDown = false;
    else isDown = true;
  };

  const onClickSetting = () => {
    upPortPut();
    downPortPut();
    if (isUp === false && isDown === false) {
      if (isDownSuccess === false) {
        toast.warning("DEVICE ID는 0~32767 사이 숫자를 입력하세요.", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (isUpSuccess === false) {
        toast.warning("LISTEN PORT는 1~65535 사이 숫자를 입력하세요.", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.warning("변경 사항이 없습니다.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else if (validPort === true) {
      toast.warning("LISTEN PORT는 중복될 수 없습니다.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (isUpSuccess === true && isDownSuccess === true) {
      const putPortArr = {
        downPortList: downPortJson,
        upPortList: upPortJson,
      };
      updatePortSetting(ABS_URL, putPortArr);
      setIsChanged(false);
      // setDownPorts(downPorts);
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
