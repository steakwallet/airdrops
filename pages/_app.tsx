import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content="web3, crypto, cryptocurrency, airdrops"
        />
        <meta name="description" content="The latest cryptocurrency airdrops" />
        <meta name="author" content="Steakwallet" />

        <title>Web3 Airdrops</title>

        <script
          defer
          data-domain="airdrops.steakwallet.fi"
          src="https://plausible.io/js/plausible.js"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
