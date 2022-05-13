interface TabProp {
  tabIndex: number;
}
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

export default function NetworkTabCont({ tabIndex }: TabProp) {
  return (
    <div className="h-[calc(100%-50px)] w-full">
      {tabIndex === 0 ? (
        <div className="h-full w-full rounded-b-lg border bg-white p-2 shadow-sm">
          <div className="mx-auto flex w-[98%] items-center justify-start space-x-4 border-b-[1px] border-gray-200 p-2 pb-4">
            <h5 className="h-[36px] bg-lanIco bg-[left_center] bg-no-repeat pl-16 text-xl font-bold leading-[36px] text-gray-900">
              LAN 1
            </h5>
            <span>100Mbps</span>
          </div>

          <div className="mx-auto w-[98%] p-4">
            <ul
              role="list"
              className="grid grid-cols-6 gap-y-2 align-middle text-sm"
            >
              <li className="font-bold text-gray-700">IP</li>
              <li className="col-span-2 text-gray-600">192.168.123.159:8080</li>
              <li className="font-bold text-gray-700">NETMASK</li>
              <li className="col-span-2 text-gray-600">255.255.0.0</li>
              <li className="font-bold text-gray-700">MAP</li>
              <li className="col-span-2 text-gray-600">00:30:18:09:ba:cd</li>
              <li className="font-bold text-gray-700">GATEWAY</li>
              <li className="col-span-2 text-gray-600">192.168.123.1</li>
            </ul>

            <ul
              role="list"
              className="grid grid-cols-5 gap-y-2 pt-10 align-middle text-sm"
            >
              <li className="pr-6 text-right font-bold text-gray-700">RX</li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  BYTES
                </span>
                123456789
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                5678
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                0
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                0
              </li>
            </ul>

            <ul
              role="list"
              className="grid grid-cols-5 gap-y-2 pt-10 align-middle text-sm"
            >
              <li className="pr-6 text-right font-bold text-gray-700">TX</li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  BYTES
                </span>
                123456789
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                5678
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                0
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                0
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="h-full w-full rounded-b-lg border bg-white p-2 shadow-sm">
          <div className="mx-auto flex w-[98%] items-center justify-start space-x-4 border-b-[1px] border-gray-200 p-2 pb-4">
            <h5 className="h-[36px] bg-lanIco bg-[left_center] bg-no-repeat pl-16 text-xl font-bold leading-[36px] text-gray-900">
              LAN 2
            </h5>
            <span>100Mbps</span>
            <ul className=" top-6 right-5 flex space-x-4">
              {/* <li className="flex items-center space-x-1 text-sm text-[#FFAB4A]">
                <span className="h-3 w-3 rounded-full bg-[#FFAB4A]"></span>
                <span>준비</span>
              </li>
              <li className="flex items-center space-x-1 text-sm text-[#DE1717]">
                <span className="h-3 w-3 rounded-full bg-[#DE1717]"></span>
                <span>에러</span>
              </li> */}
              <li className="flex items-center space-x-1 text-sm text-[#319500]">
                <span className="h-3 w-3 rounded-full bg-[#319500]"></span>
                <span>정상</span>
              </li>
              {/* <li className="flex items-center space-x-1 text-sm text-[#1694D5]">
                <span className="h-3 w-3 rounded-full bg-[#1694D5]"></span>
                <span>정지</span>
              </li>
              <li className="flex items-center space-x-1 text-sm text-[#B5B5B5]">
                <span className="h-3 w-3 rounded-full bg-[#B5B5B5]"></span>
                <span>미설정</span>
              </li> */}
            </ul>
          </div>

          <div className="mx-auto w-[98%] p-4">
            <ul
              role="list"
              className="grid grid-cols-6 gap-y-2 align-middle text-sm"
            >
              <li className="font-bold text-gray-700">IP</li>
              <li className="col-span-2 text-gray-600">112341234</li>
              <li className="font-bold text-gray-700">NETMASK</li>
              <li className="col-span-2 text-gray-600">23450</li>
              <li className="font-bold text-gray-700">MAP</li>
              <li className="col-span-2 text-gray-600">004567d</li>
              <li className="font-bold text-gray-700">GATEWAY</li>
              <li className="col-span-2 text-gray-600">1956781</li>
            </ul>

            <ul
              role="list"
              className="grid grid-cols-5 gap-y-2 pt-10 align-middle text-sm"
            >
              <li className="pr-6 text-right font-bold text-gray-700">RX</li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  BYTES
                </span>
                3465
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                56786785
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                0
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                0
              </li>
            </ul>

            <ul
              role="list"
              className="grid grid-cols-5 gap-y-2 pt-10 align-middle text-sm"
            >
              <li className="pr-6 text-right font-bold text-gray-700">TX</li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  BYTES
                </span>
                123456456789
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                5678123
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                0
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                0
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
