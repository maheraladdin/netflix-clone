import { Inter } from 'next/font/google'
import Head from "next/head";
import Router from "next/router";
import {getSession, signOut} from "next-auth/react";
import {NextPageContext} from "next";
import useGetCurrentUser from "@/hooks/get-current-user-hook";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {data: user} = useGetCurrentUser();

    return (
      <>
        <Head>
            <title>Netflix Clone</title>
        </Head>
        <main
          className={`${inter.className} text-xl flex gap-4 text-white`}
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

            <button onClick={_ => signOut()}>
                Sign Out
            </button>
        </main>
          <pre className={"text-white"}>
                {JSON.stringify(user, null, 2)}
            </pre>
      </>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    if(!session) return {
        redirect: {
            destination: "/auth?formType=sign-in",
            permanent: false
        }
    }

    return {
        props: {}
    }
}
