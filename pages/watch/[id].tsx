import useGetMovieById from "@/hooks/get-movie-by-id-hook";
import {useRouter} from "next/router";
import {AiOutlineArrowLeft} from "react-icons/ai";

export default function Watch() {
    const router = useRouter();
    const {id} = router.query;
    const {data} = useGetMovieById(id as string);

    return (
        <div>
            <nav
                className={"fixed top-0 z-10 flex text-white text-opacity-50 hover:text-opacity-100 items-center gap-3 w-full p-3"}
                role={"button"}
                onClick={() => router.back()}
            >
                <AiOutlineArrowLeft size={40}/>
                <p className={"text-xl md:text-3xl font-light"}>
                    Watching: &nbsp;
                    <span className={"font-bold"}>
                    {data?.movie?.title}
                    </span>
                </p>
            </nav>
            <video
                autoPlay
                controls
                className={"w-screen h-screen object-contain"}
                src={data?.movie?.videoUrl}
                poster={data?.movie?.thumbnailUrl}
            ></video>
        </div>
    )
}