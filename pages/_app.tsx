import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layout";
import RouteGuard from "../components/RouteGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </QueryClientProvider>
  );
}
