import axios from "axios";

export default function useUploadFirmware() {
  axios({
    method: "POST",
    url: `http://192.168.123.190:8080/api/system/uploadFirmware`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
