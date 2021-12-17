import { AppProps } from "next/app";
import Head from "next/head";
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta property="og:image" content="/public/vercel.svg" key="og-image" />
        <link rel="icon" href="/public/vercel.svg" />
        <meta property="og:image:width" content="64" />
        <meta property="og:image:height" content="64" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
