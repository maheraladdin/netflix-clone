import { Inter } from 'next/font/google'
import Head from "next/head";
import {getSession} from "next-auth/react";
import {NextPageContext} from "next";
import useGetCurrentUser from "@/hooks/get-current-user-hook";
import {navItems, accountItems} from "@/lib/data";
import OverlayMenu from "@/components/overlay-menu";
import Navbar from "@/components/navbar";
import useOverlayMenu from "@/hooks/overlay-menu-hook";
import RandomMovieHeader from "@/components/random-movie-header";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {data: user} = useGetCurrentUser();
    const {
        visibleBrowse,
        toggleBrowseMenu,
        visibleAccount,
        toggleAccountMenu,
    } = useOverlayMenu();

    return (
        <>
            <Head>
                <title>Netflix Clone</title>
                <meta name={"description"} content={"Netflix Clone"}/>
            </Head>
            <main className={`${inter.className} relative`}>
                <Navbar toggleBrowseMenu={toggleBrowseMenu} toggleAccountMenu={toggleAccountMenu} />
                <RandomMovieHeader />
            </main>
            <OverlayMenu visible={visibleBrowse} toggleMenu={toggleBrowseMenu} navItems={navItems}/>
            <OverlayMenu visible={visibleAccount} toggleMenu={toggleAccountMenu} navItems={accountItems} account={user?.name || user?.user?.name}/>
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
