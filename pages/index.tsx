import { Inter } from 'next/font/google'
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <>
        <Head>
            <title>Netflix Clone</title>

        </Head>
        <main
          className={`${inter.className}`}
        >
            <h1 className="text-4xl font-bold text-center">
                Hello World
            </h1>
        </main>
      </>
  )
}
