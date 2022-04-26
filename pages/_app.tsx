import "../styles/globals.css";
import "../public/asset/fontawesome/css/all.min.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
