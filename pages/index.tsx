import { Inter } from 'next/font/google'
import Head from "next/head";
import Router from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <>
        <Head>
            <title>Netflix Clone</title>

        </Head>
        <main
          className={`${inter.className} text-xl flex gap-4`}
        >
            <button onClick={_ => Router.push({pathname: "/auth", query: {
                    formType: "sign-in"
                }})}>
                Sign In
            </button>

            <button onClick={_ => Router.push({pathname: "/auth", query: {
                    formType: "sign-up"
                }})}>
                Sign Up
            </button>
        </main>
      </>
  )
}
