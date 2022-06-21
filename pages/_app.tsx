import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function DrimApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default DrimApp;
