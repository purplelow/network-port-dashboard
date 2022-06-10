import axios from "axios";

export default function useUploadFirmware() {
  axios({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `http://192.168.123.190:8080/api/system/uploadFirmware`,
    method: "POST",
  });
}
