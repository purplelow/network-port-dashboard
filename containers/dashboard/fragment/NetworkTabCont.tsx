import { cls } from "@libs/utils";
import useNetworkInfo from "@api/dashBoard/networkInfo";
interface TabProp {
  tabIndex: number;
}

export default function NetworkTabCont({ tabIndex }: TabProp) {
  const { networkInfo, isLoading, isError } = useNetworkInfo();
  // const mbpsCalc = () => { let bpsSpeed = networkInfo?.interfaces[0].speed; bpsSpeed / 10000; };

  const bpsSpeedA = networkInfo?.interfaces[0].speed! / 1000000;
  const bpsSpeedB = networkInfo?.interfaces[1]?.speed! / 1000000;

  const statusImgA = () => {
    let result;
    if (
      networkInfo?.interfaces[0].admin_status === 1 &&
      networkInfo?.interfaces[0].oper_status === 1
    ) {
      result = "bg-lanConnected";
    } else if (
      networkInfo?.interfaces[0].admin_status === 1 &&
      networkInfo?.interfaces[0].oper_status === 2
    ) {
      result = "bg-lanDisconnected";
    } else {
      result = "bg-lanInactive";
    }
    return result;
  };
  const statusImgB = () => {
    let result;
    if (
      networkInfo?.interfaces[1]?.admin_status === 1 &&
      networkInfo?.interfaces[1]?.oper_status === 1
    ) {
      result = "bg-lanConnected";
    } else if (
      networkInfo?.interfaces[1]?.admin_status === 1 &&
      networkInfo?.interfaces[1]?.oper_status === 2
    ) {
      result = "bg-lanDisconnected";
    } else {
      result = "bg-lanInactive";
    }
    return result;
  };

  return (
    <div className="h-[calc(100%-50px)] w-full">
      {tabIndex === 0 ? (
        <div className="h-full w-full rounded-b-lg border bg-white p-2 shadow-sm">
          <div className="mx-auto flex w-[98%] items-center justify-start space-x-4 border-b-[1px] border-gray-200 p-2 pb-4">
            <h5
              className={cls(
                "h-[41px] bg-[left_bottom] bg-no-repeat pl-16 text-xl font-bold leading-[41px] text-gray-900",
                statusImgA()
              )}
            >
              {networkInfo?.interfaces[0].name}
            </h5>
            <span>{bpsSpeedA ? bpsSpeedA : "-"} Mbps</span>
          </div>

          <div className="mx-auto w-[98%] p-4">
            <ul
              role="list"
              className="grid grid-cols-6 gap-y-2 align-middle text-sm"
            >
              <li className="font-bold text-gray-700">IP</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[0].addresses[0].address}
              </li>
              <li className="font-bold text-gray-700">NETMASK</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[0].addresses[0].mask}
              </li>
              <li className="font-bold text-gray-700">MAC</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[0].mac_address}
              </li>
              <li className="font-bold text-gray-700">GATEWAY</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[0].addresses[0].gateway}
              </li>
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
                {networkInfo?.interfaces[0].statistics.rx_bytes}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                {networkInfo?.interfaces[0].statistics.rx_discards}
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                {networkInfo?.interfaces[0].statistics.rx_errors}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                {networkInfo?.interfaces[0].statistics.rx_packets}
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
                {networkInfo?.interfaces[0].statistics.tx_bytes}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                {networkInfo?.interfaces[0].statistics.tx_discards}
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                {networkInfo?.interfaces[0].statistics.tx_errors}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                {networkInfo?.interfaces[0].statistics.tx_packets}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="h-full w-full rounded-b-lg border bg-white p-2 shadow-sm">
          <div className="mx-auto flex w-[98%] items-center justify-start space-x-4 border-b-[1px] border-gray-200 p-2 pb-4">
            <h5
              className={cls(
                "h-[41px] bg-[left_bottom] bg-no-repeat pl-16 text-xl font-bold leading-[41px] text-gray-900",
                statusImgB()
              )}
            >
              {networkInfo?.interfaces[1]?.name}
            </h5>
            <span>{bpsSpeedB ? bpsSpeedB : "-"} Mbps</span>
          </div>

          <div className="mx-auto w-[98%] p-4">
            <ul
              role="list"
              className="grid grid-cols-6 gap-y-2 align-middle text-sm"
            >
              <li className="font-bold text-gray-700">IP</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[1]?.addresses[0].address}
              </li>
              <li className="font-bold text-gray-700">NETMASK</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[1]?.addresses[0].mask}
              </li>
              <li className="font-bold text-gray-700">MAC</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[1]?.mac_address}
              </li>
              <li className="font-bold text-gray-700">GATEWAY</li>
              <li className="col-span-2 text-gray-600">
                {networkInfo?.interfaces[1]?.addresses[0].gateway}
              </li>
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
                {networkInfo?.interfaces[1]?.statistics.rx_bytes}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                {networkInfo?.interfaces[1]?.statistics.rx_discards}
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                {networkInfo?.interfaces[1]?.statistics.rx_errors}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                {networkInfo?.interfaces[1]?.statistics.rx_packets}
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
                {networkInfo?.interfaces[1]?.statistics.tx_bytes}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  DISCARDS
                </span>
                {networkInfo?.interfaces[1]?.statistics.tx_discards}
              </li>
              <li className="font-bold text-gray-700"></li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  ERRORS
                </span>
                {networkInfo?.interfaces[1]?.statistics.tx_errors}
              </li>
              <li className="col-span-2 text-gray-600">
                <span className="mr-2 inline-block w-[75px] rounded-full bg-gray-500 p-1 text-center text-xs text-white">
                  PACKETS
                </span>
                {networkInfo?.interfaces[1]?.statistics.tx_packets}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
