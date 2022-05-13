import { cls } from "../../../lib/utils";
// UNUSED(미설정)", "DOWN(정지)", "READY(준비)", "RUN(정상)", "ERROR(에러)
interface UpComProps {
  app_service: {
    name: string;
    port: string;
    status: string;
    protocol: string;
    interface: string;
    id: string;
  };
}
let upComData: UpComProps[];
upComData = [
  {
    app_service: {
      name: "COM1",
      port: "6001",
      status: "UNUSED",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "1",
    },
  },
  {
    app_service: {
      name: "COM2",
      port: "6001",
      status: "DOWN",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "2",
    },
  },
  {
    app_service: {
      name: "COM3",
      port: "6001",
      status: "ERROR",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "3",
    },
  },
  {
    app_service: {
      name: "COM4",
      port: "6001",
      status: "RUN",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "4",
    },
  },
  {
    app_service: {
      name: "COM5",
      port: "6001",
      status: "ERROR",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "5",
    },
  },
  {
    app_service: {
      name: "COM6",
      port: "6001",
      status: "RUN",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "6",
    },
  },
  {
    app_service: {
      name: "COM7",
      port: "6001",
      status: "READY",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "7",
    },
  },
  {
    app_service: {
      name: "COM8",
      port: "6001",
      status: "READY",
      protocol: "HSMS",
      interface: "TCP/IP",
      id: "8",
    },
  },
];

export default function UpCom() {
  return (
    <>
      <ul className="my-auto mt-4 flex h-3/5 space-x-1">
        {upComData.map((com, i) => {
          const upComCondBox = () => {
            let result;
            switch (com.app_service.status) {
              case "READY":
                result = "border-[#FFAB4A] bg-upComReady text-[#FFAB4A]";
                break;
              case "ERROR":
                result = "border-[#DE1717] bg-upComError text-[#DE1717]";
                break;
              case "RUN":
                result = "border-[#319500] bg-upComNormal text-[#319500]";
                break;
              case "DOWN":
                result = "border-[#1694D5] bg-upComStop text-[#1694D5]";
                break;
              case "UNUSED":
                result = "border-[#B5B5B5] bg-upComNone text-[#B5B5B5]";
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
                {(com.app_service.status === "READY" && "준비") ||
                  (com.app_service.status === "ERROR" && "에러") ||
                  (com.app_service.status === "RUN" && "정상") ||
                  (com.app_service.status === "DOWN" && "정지") ||
                  (com.app_service.status === "UNUSED" && "미설정")}
              </span>
              <span className="absolute bottom-2 w-full text-center">
                {com.app_service.name}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
