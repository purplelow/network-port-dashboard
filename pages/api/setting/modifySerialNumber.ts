import axios from "axios";

export default function modifySerialNumber(modelInfoJson: any) {
  axios
    .put(
      `http://192.168.123.190:8080/api/deviceSetting/modifySerialNumber`,
      modelInfoJson
    )
    .then((res) => {
      console.log("시리얼 넘버 response ::", res.data);
      alert("수정되었습니다.");
      // () => {
      //   const toasts = useToasts();

      //   return (
      //     <Button
      //       success
      //       onClick={() => {
      //         toasts.success("The Evil Rabbit jumped over the fence.");
      //       }}
      //     >
      //       Show Toast
      //     </Button>
      //   );
      // };
    });
}
