import type { AppProps } from "next/app";
import "../app/globals.css";
import { SnackbarProvider } from "notistack";
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TonConnectUIProvider
      manifestUrl={
        "https://single-nominator-client.netlify.app/tonconnect-manifest.json"
      }
    >
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </TonConnectUIProvider>
  );
}
