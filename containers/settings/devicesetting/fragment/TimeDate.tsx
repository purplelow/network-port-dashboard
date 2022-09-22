import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import moment from "moment";

import useTimeInfo from "@api/setting/getTimeInfo";
import { cls } from "@libs/utils";
import upDateTimeInfo from "@api/setting/upDateTimeInfo";

import "react-datepicker/dist/react-datepicker.css";

const TimezoneSelect = dynamic(() => import("react-timezone-select"), {
  ssr: false,
});

// interface upDataTimeProps {}

export default function TimeDateInfo({ ABS_URL }: any) {
  const { register, handleSubmit } = useForm();
  const [timeTabIndex, setTimeTabIndex] = useState(0);
  const { sysTimeInfo }: any = useTimeInfo({ ABS_URL });
  const sysSetTimeGMT: any = sysTimeInfo?.timeInfo.split("_")[2];
  const [selectedTimezone, setSelectedTimezone]: any = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const sysSetTime: string = `${sysTimeInfo?.timeInfo.split("_")[0]} ${
    sysTimeInfo?.timeInfo.split("_")[1]
  }`;
  let date = moment(sysSetTime).toISOString();
  const [startDate, setStartDate] = useState(new Date());

  const selectedGMT = () => {
    let result;
    if (selectedTimezone) {
      result = selectedTimezone.toString().split("/");
    } else {
      result = "";
    }
    return result;
  };
  const GMTArea = selectedGMT()[0];
  const GMTZone = selectedGMT()[1];
  const dateJsonOb = format(startDate, "yyyy-MM-dd HH:mm:ss");

  const updateTimeJson = {
    area: GMTArea,
    zone: GMTZone,
    date: dateJsonOb,
  };
  const onValid = () => {
    upDateTimeInfo({ ABS_URL }, updateTimeJson);
  };

  useEffect(() => {
    setSelectedTimezone(
      sysSetTimeGMT ?? Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    if (sysSetTime !== undefined) setStartDate(new Date(date));
  }, [sysTimeInfo]);

  return (
    <div className="rounded-md bg-white shadow-md">
      <div className="flex items-center justify-start p-10">
        <div className="w-full">
          <ul className="flex divide-x divide-gray-200 text-center text-sm font-medium text-gray-500">
            <li className="">
              <button
                onClick={() => {
                  setTimeTabIndex(0);
                }}
                className={cls(
                  "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
                  timeTabIndex === 0
                    ? "bg-blue-800 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                )}
                aria-current="page"
              >
                시간설정(수동)
              </button>
            </li>
            {/* ==================Diva 888 제외 */}
            {/* <li className="">
                  <button
                    onClick={() => {
                      setTimeTabIndex(1);
                    }}
                    className={cls(
                      "inline-block w-full rounded-t-md py-2 px-10 outline-none focus:outline-none",
                      timeTabIndex === 1
                        ? "bg-blue-800 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    )}
                  >
                    시간설정(NTP)
                  </button>
                </li> */}
          </ul>
          <div className="border-b border-t border-gray-300 py-10">
            {timeTabIndex === 0 ? (
              <form onSubmit={handleSubmit(onValid)} className="h-full">
                <div className="flex h-full items-center justify-between">
                  <div className="flex w-2/5 items-center">
                    <label className="pr-2 text-sm font-medium text-gray-900">
                      날짜 및 시간
                    </label>
                    {/* <DateCustom /> */}
                    <div className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700">
                      <DatePicker
                        locale={ko}
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        timeCaption="시간"
                        dateFormat="yyyy-MM-dd hh:mm aa"
                      />
                    </div>
                  </div>
                  <div className="flex w-2/5 items-center">
                    <label className="min-w-[85px] pr-2 text-right text-sm font-medium text-gray-900">
                      표준 시간대
                    </label>
                    <div className="w-4/5 text-sm">
                      <TimezoneSelect
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.value)}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/5 justify-end">
                    <button
                      type="submit"
                      className="rounded-sm border border-blue-700 bg-blue-700 p-2.5 px-10 text-sm font-medium text-white hover:bg-blue-800 "
                    >
                      설정 적용
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // Diva 888 제외
              <div>{/* <h2>시간설정 (NTP)</h2> */}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
