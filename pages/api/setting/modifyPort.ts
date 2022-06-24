import axios from "axios";

// let upPortJson = {
//   upPortList: [
//     {
//       id: "",
//       port: "",
//     }
//   ]
// }

// let downPortJson = {
//   downPortList: [
//     {
//       baudrate: "",
//       databits: "",
//       type: "",
//       deviceId: "",
//       id: "",
//       model: "",
//       name: "",
//       parity: "",
//       stopbits: "",
//     }    
//   ]
// }

export default function updatePortSetting(portJson: any) {
  axios.put(
      `http://192.168.123.190:8080/api/portSetting/modifyPort`,
      portJson
    ).then((res) => {
      console.log("포트정보 : "+res);
    });
}