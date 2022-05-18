import type { NextPage } from "next";
import { useState } from "react";
import BoardTitle from "../../../components/common/BoardTitle";
import Layout from "../../../components/layout";
import { cls } from "../../../lib/utils";
import { GmtList } from "../../../lib/gmt";
import StatusInfo from "../../../components/common/StatusInfo";

const DeviceSetting = () => {
  const [timeTabIndex, setTimeTabIndex] = useState(0);
  return (
    <Layout title="장비 기본설정">
      <div className="grid h-full grid-rows-6 gap-y-2">
        <div className="w-full rounded-md bg-white shadow-md">
          <form className="h-full">
            <div className="flex h-full items-center justify-between px-10">
              <div className="flex w-2/5 items-center">
                <span className="px-4 text-sm font-medium text-gray-900">
                  모델명
                </span>
                <input
                  type="text"
                  className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 outline-none focus:border-2 focus:border-gray-700"
                  placeholder="모델명"
                  required
                />
              </div>
              <div className="flex w-2/5 items-center">
                <span className="px-4 text-sm font-medium text-gray-900">
                  시리얼 넘버
                </span>
                <input
                  type="text"
                  className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                  placeholder="시리얼 넘버"
                  required
                />
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
        </div>

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
                <li className="">
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
                </li>
              </ul>
              <div className="border border-gray-300 px-6 py-10">
                {timeTabIndex === 0 ? (
                  <form className="h-full">
                    <div className="flex h-full items-end justify-between">
                      <div className="flex w-2/5 items-center">
                        <span className="px-4 text-sm font-medium text-gray-900">
                          날짜 및 시간
                        </span>
                        <input
                          type="text"
                          className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                          placeholder="날짜 및 시간"
                          required
                        />
                      </div>
                      <div className="flex w-2/5 items-center">
                        <span className="px-4 text-sm font-medium text-gray-900">
                          표준 시간대
                        </span>
                        <select
                          id="countries"
                          className="w-4/5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-2 focus:border-gray-700"
                        >
                          {/* <option value="Asia/Shanghai" selected>
                            (UTC+08:00) 베이징, 충칭, 홍콩 특별 행정구, 우루무치
                          </option>
                          <option value="Asia/Seoul">(UTC+09:00) 서울</option>
                          <option value="Asia/Tokyo">
                            (UTC+08:00) (UTC+09:00) 오사카, 삿포로, 도쿄
                          </option> */}
                          {GmtList.map((gmt, i) => (
                            <option value={gmt.zone} key={i}>
                              {gmt.zone}&nbsp;
                              {gmt.time}
                            </option>
                          ))}
                        </select>
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
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="relative row-span-3 w-full bg-white p-2 shadow-md">
          <BoardTitle subTitle="네트워크 설정" />
          <ul className="absolute top-6 right-5 flex space-x-10">
            <li className="flex items-center space-x-1 text-sm text-[#319500]">
              <div className="h-[41px] w-[49px] bg-lanConnected bg-no-repeat" />
              <span className="h-3 w-3 rounded-full bg-[#319500]"></span>
              <span>연결됨</span>
            </li>
            <li className="flex items-center space-x-1 text-sm text-[#DE1717]">
              <div className="h-[41px] w-[49px] bg-lanDisconnected bg-no-repeat" />
              <span className="h-3 w-3 rounded-full bg-[#DE1717]"></span>
              <span>연결끊김</span>
            </li>
            <li className="flex items-center space-x-1 text-sm text-[#B5B5B5]">
              <div className="h-[41px] w-[49px] bg-lanInactive bg-left-bottom bg-no-repeat" />
              <span className="h-3 w-3 rounded-full bg-[#B5B5B5]"></span>
              <span>비활성</span>
            </li>
          </ul>

          <form className="mt-12">
            <ul className="space-y-2">
              <li className="flex items-center justify-between bg-blue-50 px-10 py-4">
                <div className="flex w-[20%] items-center space-x-8">
                  <span className="font-bold">LAN 1</span>
                  <span className="h-3 w-3 rounded-full bg-[#319500]"></span>
                  <div className="h-[41px] w-[49px] bg-lanConnected bg-no-repeat" />
                </div>
                <div className="flex w-[30%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    IP 주소
                  </span>
                  <input
                    type="text"
                    className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="IP 주소"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    NETMASK
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="NETMASK"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    GATEWAY
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="GATEWAY"
                    required
                  />
                </div>
              </li>

              <li className="flex items-center justify-between bg-blue-50 px-10 py-4">
                <div className="flex w-[20%] items-center space-x-8">
                  <span className="font-bold">LAN 2</span>
                  <span className="h-3 w-3 rounded-full bg-[#DE1717]"></span>
                  <div className="h-[41px] w-[49px] bg-lanDisconnected bg-no-repeat" />
                </div>
                <div className="flex w-[30%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    IP 주소
                  </span>
                  <input
                    type="text"
                    className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="IP 주소"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    NETMASK
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="NETMASK"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    GATEWAY
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="GATEWAY"
                    required
                  />
                </div>
              </li>

              <li className="flex items-center justify-between bg-blue-50 px-10 py-4">
                <div className="flex w-[20%] items-center space-x-8">
                  <span className="font-bold">LAN 3</span>
                  <span className="h-3 w-3 rounded-full bg-[#B5B5B5]"></span>
                  <div className="h-[41px] w-[49px] bg-lanInactive bg-no-repeat" />
                </div>
                <div className="flex w-[30%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    IP 주소
                  </span>
                  <input
                    type="text"
                    className="w-4/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="IP 주소"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    NETMASK
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="NETMASK"
                    required
                  />
                </div>
                <div className="flex w-[25%] items-center">
                  <span className="px-4 text-sm font-medium text-gray-900">
                    GATEWAY
                  </span>
                  <input
                    type="text"
                    className="w-3/5 rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900  outline-none focus:border-2 focus:border-gray-700"
                    placeholder="GATEWAY"
                    required
                  />
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DeviceSetting;
