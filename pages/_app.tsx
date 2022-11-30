import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { GeistProvider } from "@geist-ui/core";
import theme from "../config/theme";
import Layout from "../components/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GeistProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GeistProvider>
    </ThemeProvider>
  );
}

export default App;
