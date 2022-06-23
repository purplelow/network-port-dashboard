import { useRecoilState } from "recoil";
import { routerUrl } from "recoil/atom";
import absoluteUrl from "next-absolute-url";
import { useEffect } from "react";

export default function urlBranch() {
  const DEV_ENV = process.env.NEXT_PUBLIC_DEV;
  const [absUrl, setAbsUrl] = useRecoilState(routerUrl);

  if (typeof window !== "undefined") {
    useEffect(() => {
      const { host } = absoluteUrl();
      const apiURL = `http://${host}`;

      if (DEV_ENV) setAbsUrl(DEV_ENV);
      else setAbsUrl(apiURL);
    }, []);
  }
}
