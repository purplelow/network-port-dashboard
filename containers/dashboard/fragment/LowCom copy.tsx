import { cls } from "../../../lib/utils";
// UNUSED(미설정)", "DOWN(정지)", "READY(준비)", "RUN(정상)", "ERROR(에러)
interface LowComProps {
  sub_device: {
    name: string;
    baudrate: string;
    model: string | null;
    type: string | null;
    status: string;
    protocol: string;
    interface?: string;
    id: string;
  };
}
let LowComData: LowComProps[];
LowComData = [
  {
    sub_device: {
      name: "COM1",
      baudrate: "9600",
      model: null,
      type: null,
      status: "READY",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "1",
    },
  },
  {
    sub_device: {
      name: "COM2",
      baudrate: "9600",
      model: null,
      type: null,
      status: "ERROR",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "2",
    },
  },
  {
    sub_device: {
      name: "COM3",
      baudrate: "9600",
      model: null,
      type: null,
      status: "RUN",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "3",
    },
  },
  {
    sub_device: {
      name: "COM4",
      baudrate: "9600",
      model: null,
      type: null,
      status: "DOWN",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "4",
    },
  },
  {
    sub_device: {
      name: "COM5",
      baudrate: "9600",
      model: null,
      type: null,
      status: "UNUSED",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "5",
    },
  },
  {
    sub_device: {
      name: "COM6",
      baudrate: "9600",
      model: null,
      type: null,
      status: "RUN",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "6",
    },
  },
  {
    sub_device: {
      name: "COM7",
      baudrate: "9600",
      model: null,
      type: null,
      status: "RUN",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "7",
    },
  },
  {
    sub_device: {
      name: "COM8",
      baudrate: "9600",
      model: null,
      type: null,
      status: "RUN",
      protocol: "SECS-I",
      interface: "SERIAL",
      id: "8",
    },
  },
];

export default function LowCom() {
  return (
    <>
      <ul className="my-auto mt-4 flex h-3/5 space-x-1">
        {LowComData.map((com, i) => {
          const upComCondBox = () => {
            let result;
            switch (com.sub_device.status) {
              case "READY":
                result = "border-[#FFAB4A] bg-lowComReady text-[#FFAB4A]";
                break;
              case "ERROR":
                result = "border-[#DE1717] bg-lowComError text-[#DE1717]";
                break;
              case "RUN":
                result = "border-[#319500] bg-lowComNormal text-[#319500]";
                break;
              case "DOWN":
                result = "border-[#1694D5] bg-lowComStop text-[#1694D5]";
                break;
              case "UNUSED":
                result = "border-[#B5B5B5] bg-lowComNone text-[#B5B5B5]";
                break;
              default:
                result = "";
            }
            return result;
          };
          return (
            <li
              className={cls(
                "relative h-full w-[12%] border-[1px] bg-[center_top_1rem] bg-no-repeat text-sm",
                upComCondBox()
              )}
              key={i}
            >
              <span className="absolute bottom-9 w-full text-center">
                {(com.sub_device.status === "READY" && "준비") ||
                  (com.sub_device.status === "ERROR" && "에러") ||
                  (com.sub_device.status === "RUN" && "정상") ||
                  (com.sub_device.status === "DOWN" && "정지") ||
                  (com.sub_device.status === "UNUSED" && "미설정")}
              </span>
              <span className="absolute bottom-2 w-full text-center">
                {com.sub_device.name}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
