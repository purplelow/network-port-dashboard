import Link from "next/link";
import { cls } from "@libs/utils";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { AiOutlineSetting } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import useLowPortData from "@api/dashBoard/lowPort";
// UNUSED(미설정)", "DOWN(정지)", "READY(준비)", "RUN(정상)", "ERROR(에러)

export default function LowCom({ ABS_URL }: any) {
  const { lowPortInfo, isLoading, isError }: any = useLowPortData(ABS_URL);
  return (
    <>
      <ul className="my-auto mt-4 flex h-3/5 space-x-1">
        {lowPortInfo?.map((com: any, i: string) => {
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
              <ContextMenuTrigger id="contextmenu">
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
              </ContextMenuTrigger>
            </li>
          );
        })}
      </ul>
      <ContextMenu id="contextmenu">
        <MenuItem>
          <AiOutlineSetting />
          <Link href="/settings/portSetting">
            <a className="px-2.5">포트 설정</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <VscDebugRestart />
          <span>포트 리셋</span>
        </MenuItem>
      </ContextMenu>
    </>
  );
}
