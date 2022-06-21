import { useRecoilState } from "recoil";
import { routerUrl } from "recoil/atom";
import absoluteUrl from "next-absolute-url";

export default function urlBranch() {
  const DEV_ENV = process.env.NEXT_PUBLIC_DEV;
  const [absUrl, setAbsUrl] = useRecoilState(routerUrl);
  if (typeof window !== "undefined") {
    const { origin } = absoluteUrl();
    if (DEV_ENV) setAbsUrl(DEV_ENV);
    else setAbsUrl(origin);
  }
}
