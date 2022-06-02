import useTimeInfo from "@api/setting/getTimeInfo";
import { cls } from "@libs/utils";
import moment from "moment-timezone";
import { useState } from "react";
import TimezoneSelect from "react-timezone-select";

export default function TimeDateInfo() {
  const { sysTimeInfo } = useTimeInfo();
  const [timeTabIndex, setTimeTabIndex] = useState(0);
  const [datetime, setDatetime] = useState(moment());

  // useEffect(() => {
  //   const tzValue = tz.value ?? tz;
  //   setDatetime(datetime.tz(tzValue));
  // }, [tz, datetime]);

  const [tz, setTz]: any = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  return (
    <div className="row-span-2 rounded-md bg-white shadow-md">
      <div className="flex items-center justify-start p-8">
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
          <div className="border border-gray-300 px-6 py-10">
            {
              timeTabIndex === 0 ? (
                <form className="h-full">
                  <div className="flex h-full items-end justify-between">
                    <div className="flex w-2/5 items-center">
                      <span className="pr-2 text-sm font-medium text-gray-900">
                        날짜 및 시간
                      </span>
                      <input
                        // value={sysTimeInfo?.timeInfo ?? 0}
                        // onChange={(e) => e.target.value}
                        defaultValue={sysTimeInfo?.timeInfo ?? ""}
                        type="text"
                        className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-[1px] focus:border-gray-700"
                        placeholder="날짜 및 시간"
                        required
                      />
                    </div>
                    <div className="flex w-2/5 items-center">
                      <span className="pr-2 text-sm font-medium text-gray-900">
                        표준 시간대
                      </span>
                      {/* <select
                          id="countries"
                          className="w-4/5 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 outline-none focus:border-[1px] focus:border-gray-700"
                        >
                          {GmtList.map((gmt, i) => (
                            <option value={gmt.zone} key={i}>
                              {gmt.zone}&nbsp;
                              {gmt.time}
                            </option>
                          ))}
                        </select> */}

                      <div className="w-4/5">
                        <TimezoneSelect value={tz} onChange={setTz} />
                      </div>

                      {/* <div className="fixed top-0 left-0 z-50 h-1/3 w-1/3 border-2 bg-slate-100">
                          <div>
                            Current Date / Time in{" "}
                            {tz.value
                              ? tz.value.split("/")[1]
                              : tz.split("/")[1]}
                            : <pre>{datetime.format("DD.MM.YY HH:mm:ss")}</pre>
                          </div>
                          <div>
                            <div>Selected Timezone:</div>
                            <pre className="tz-output">
                              {JSON.stringify(tz, null, 2)}
                            </pre>
                          </div>
                        </div> */}
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
                <div>{/* <h2>시간설정 (NTP)</h2> */}</div>
              )
              // Diva 888 제외
            }
          </div>
        </div>
      </div>
    </div>
  );
}
