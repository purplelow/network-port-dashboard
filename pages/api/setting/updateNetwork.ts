import axios from "axios";

export default function updateNetwork(neworkInfoJson: any) {
  axios
    .put(
      `http://192.168.123.190:8080/api/deviceSetting/updateNetwork`,
      neworkInfoJson
    )
    .then((res) => {
      console.log("네트워크 정보 response :: ", res.data);
      alert("수정되었습니다.");
    });
}
