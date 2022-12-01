import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { GeistProvider } from "@geist-ui/core";
import theme from "../config/theme";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GeistProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </GeistProvider>
    </ThemeProvider>
  );
}

export default App;
