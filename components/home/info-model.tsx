import {useCallback} from "react";
import {AiOutlineClose} from "react-icons/ai";
import PlayButton from "@/components/home/play-button";
import FavoriteButton from "@/components/home/favorite-button";
import useInfoModal from "@/hooks/use-info-modal-hook";
import useGetMovieById from "@/hooks/use-get-movie-by-id-hook";


export default function InfoModel() {
    const {movieId, isOpen, close } = useInfoModal();
    const {data} = useGetMovieById(movieId);

    const handleClose = useCallback(() => {
        setTimeout(() => {
            close();
        }, 300);
    },[close]);

    if(!isOpen) return null;

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-20 flex justify-center items-center transition-all duration-300`}
            onClick={handleClose}
        >
            <div
                className={`relative w-[90vw] max-w-3xl rounded-md overflow-hidden`}
                onClick={e => e.stopPropagation()}
            >
                <div
                    className={`
                        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                        transition-all duration-300
                        relative
                        flex-auto
                        bg-zinc-900
                        drop-shadow-md
                        flex
                        flex-col
                    `}
                >
                    <div className={"relative h-96 w-full"}>
                        <video
                            autoPlay
                            muted
                            loop
                            className={"w-full h-full object-cover brightness-50"}
                            src={data?.movie?.videoUrl}
                            poster={data?.movie?.thumbnailUrl}
                        ></video>
                        <div
                            title={"Close"}
                            role={"button"}
                            className={"text-white hover:text-neutral-300 absolute top-5 right-5"}
                            onClick={handleClose}
                        >
                            <AiOutlineClose size={30} />
                        </div>
                        <div className={`absolute bottom-10 left-10 flex flex-col gap-3`}>
                            <p className={`text-white text-xl sm:text-6xl font-bold`}>
                                {data?.movie?.title}
                            </p>
                            <div className={"flex gap-3"}>
                                <PlayButton movieId={data?.movie?.id} />
                                <FavoriteButton movieId={data?.movie?.id} />
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-3 p-10`}>
                        <p className={"text-green-400 font-semibold m-0 select-none"}>
                            New <span className={"text-white"}>2023</span>
                        </p>
                        <p className={"text-white font-semibold text-sm m-0 select-none"}>
                            {data?.movie?.duration}
                        </p>
                        <p className={"text-white font-semibold text-sm m-0 select-none"}>
                            {data?.movie?.genre}
                        </p>
                        <p className={"text-white font-semibold text-sm m-0 select-none leading-relaxed"}>
                            {data?.movie?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}