import Layout from "@components/layout/Layout";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Musixmatch / Who Sings?</title>
      </Head>
      <NextNProgress color="#ff5353" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
