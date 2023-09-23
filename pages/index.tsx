import { Inter } from 'next/font/google'
import Head from "next/head";
import Router from "next/router";
import {getSession, signOut} from "next-auth/react";
import {NextPageContext} from "next";
import useGetCurrentUser from "@/hooks/get-current-user-hook";
import Image from "next/image";
import {navItems} from "@/lib/data";
import BrowseMenu from "@/components/BrowseMenu";
import {useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const {data: user} = useGetCurrentUser();
    const [visible, setVisible] = useState(false);

    const toggleMenu = () => {
        setVisible(!visible);
    }

    return (
        <>
            <Head>
                <title>Netflix Clone</title>
                <meta name={"description"} content={"Netflix Clone"}/>
            </Head>
            <main className={inter.className}>
                <nav className={"w-screen py-6 bg-zinc-900 bg-opacity-80 z-10"}>
                    <div className={"container mx-auto px-5 flex items-center gap-x-6"}>
                        <Image src={"/images/logo.png"} alt={"netflix logo"} width={192 / 2} height={51.9 / 2}/>
                        <div className={"hidden lg:flex gap-x-4"}>
                            {
                                navItems.map(item => (
                                    <div key={item.path} role={"button"} className={"nav-item"}>{item.name}</div>
                                ))
                            }
                        </div>
                        <div className={"lg:hidden flex gap-x-2"}>
                            <div onClick={toggleMenu} role={"button"} className={"nav-item"}>
                                Browse
                            </div>
                        </div>
                    </div>
                    <div className={``}>

                    </div>
                </nav>
            </main>
            <BrowseMenu visible={visible} toggleMenu={toggleMenu}/>
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
