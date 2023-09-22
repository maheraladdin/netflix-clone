import {NextPageContext} from "next";
import {getSession} from "next-auth/react";
import Image from "next/image";
import useGetCurrentUser from "@/hooks/get-current-user-hook";
import {useRouter} from "next/navigation";


export default function Profiles() {
    const {data: user} = useGetCurrentUser();
    const router = useRouter();
    return (
        <div className={"flex flex-col h-screen justify-center items-center gap-8"}>
            <h1 className={"text-3xl md:text-6xl text-white text-center"}>Who is Watching?</h1>
            <div
                onClick={_ => router.push("/")}
                className={"group flex flex-col justify-center items-center gap-4"}
            >
                <Image
                    src={'/images/default-blue.png'}
                    alt={"profile-blue"}
                    width={176}
                    height={176}
                    className={"border-2 border-transparent group-hover:border-white rounded-sm cursor-pointer"}
                />
                <p
                    className={"text-gray-400 text-center text-xl md:text-3xl group-hover:text-white cursor-pointer"}
                >{user?.name || user?.user?.name}</p>
            </div>
        </div>
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