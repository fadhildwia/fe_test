import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { UserDropdown } from "@/components/UserDropdown";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            staleTime: 50
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <UserDropdown {...pageProps} />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
