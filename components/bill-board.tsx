import useBillBoard from "@/hooks/bill-board-hook";

export default function BillBoard() {
    const {data} = useBillBoard();
    return (
        <header className={"container px-5 mx-auto h-screen"}>
            <video
                autoPlay
                muted
                loop
                className={"absolute left-0 object-cover brightness-50 w-screen h-screen"}
                poster={data?.randomMovie?.posterUrl}
                src={data?.randomMovie?.videoUrl}>
            </video>
            <div className={`fixed flex flex-col gap-6 top-1/4 sm:top-1/3 text-white select-none`}>
                <p className={"text-5xl w-[50%]"}>{data?.randomMovie?.title}</p>
                <p className={"text-xl w-[90%] sm:w-3/5"}>{data?.randomMovie?.description}</p>
                <button className={"w-fit px-4 py-2 bg-white bg-opacity-30 rounded-xl hover:bg-opacity-20 transition-all"}>
                    More Info
                </button>
            </div>
        </header>
    )
}