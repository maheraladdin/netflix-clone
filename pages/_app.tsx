import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SWRConfig} from "swr";
import fetcher from "@/clint-side/lib/fetcher";
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SWRConfig value={{
        fetcher,
      }}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
  )
}
