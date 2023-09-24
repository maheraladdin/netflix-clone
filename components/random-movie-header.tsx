import useGetRandomMovie from "@/hooks/get-random-movie-hook";

export default function RandomMovieHeader() {
    const {data} = useGetRandomMovie();
    return (
        <>
            <video
                autoPlay
                muted
                loop
                className={"absolute object-cover brightness-50 h-screen w-screen"}
                poster={data?.randomMovie?.thumbnailUrl}
                src={data?.randomMovie?.videoUrl}
            >
            </video>
            <header className={"relative container px-5 mx-auto h-screen"}>
                <div className={`absolute flex flex-col gap-6 top-1/4 sm:top-1/3 text-white select-none`}>
                    <p className={"text-5xl w-[50%]"}>{data?.randomMovie?.title}</p>
                    <p className={"text-xl w-[90%] sm:w-3/5"}>{data?.randomMovie?.description}</p>
                    <button className={"w-fit px-4 py-2 bg-white bg-opacity-30 rounded-xl hover:bg-opacity-20 transition-all"}>
                        More Info
                    </button>
                </div>
            </header>
        </>
    )
}