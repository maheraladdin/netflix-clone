import { Inter } from 'next/font/google'
import Head from "next/head";
import {getSession} from "next-auth/react";
import {NextPageContext} from "next";
import useGetCurrentUser from "@/clint-side/hooks/get-current-user-hook";
import {navItems, accountItems} from "@/clint-side/lib/data";
import OverlayMenu from "@/clint-side/components/home/overlay-menu";
import Navbar from "@/clint-side/components/home/navbar";
import useOverlayMenu from "@/clint-side/hooks/overlay-menu-hook";
import RandomMovieHeader from "@/clint-side/components/home/random-movie-header";
import MoviesList from "@/clint-side/components/home/movies-list";
import useGetMovies from "@/clint-side/hooks/get-movies-hook";
import useGetFavorites from "@/clint-side/hooks/get-favorites-hook";
import InfoModel from "@/clint-side/components/home/info-model";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {data: user} = useGetCurrentUser();
    const {
        visibleBrowse,
        toggleBrowseMenu,
        visibleAccount,
        toggleAccountMenu,
    } = useOverlayMenu();
    const {data} = useGetMovies();
    const {favorites} = useGetFavorites();


    return (
        <>
            <InfoModel />
            <OverlayMenu visible={visibleBrowse} toggleMenu={toggleBrowseMenu} navItems={navItems}/>
            <OverlayMenu visible={visibleAccount} toggleMenu={toggleAccountMenu} navItems={accountItems} account={user?.name || user?.user?.name}/>
            <Head>
                <title>Netflix Clone</title>
                <meta name={"description"} content={"Netflix Clone"}/>
            </Head>
            <main className={`${inter.className} relative`}>
                <Navbar toggleBrowseMenu={toggleBrowseMenu} toggleAccountMenu={toggleAccountMenu} />
                <RandomMovieHeader />
                <div className={"flex flex-col"}>
                    <MoviesList movies={data?.movies} title={"Trending Now"} />
                    <MoviesList movies={favorites?.favorites} title={"Favorite Movies"} />
                </div>
            </main>
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
