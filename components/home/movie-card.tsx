import Image from "next/image";
import {BsFillPlayFill} from "react-icons/bs";
import {BiInfoCircle} from "react-icons/bi";
import FavoriteButton from "@/components/home/favorite-button";
import {useRouter} from "next/router";
import useInfoModal from "@/hooks/use-info-modal-hook";
import {useCallback} from "react";

type MovieCardProps = {
    movie: {
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        thumbnailUrl: string;
        genre: string;
        duration: string;
    }
}

export default function MovieCard({movie}: MovieCardProps) {
    const router = useRouter();
    const {open} = useInfoModal();
    const handleOpen = useCallback(() => {
        open(movie.id);
    }, [open, movie.id]);
    return (
        <div role={"button"} className={"group bg-zinc-900 col-span relative min-h-[12vw] h-[160px]"}>
            <Image className={"object-cover transition-all duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-full"} src={movie.thumbnailUrl} alt={movie.title} width={300} height={300} />
            <div className={"absolute top-0 transition-all duration-300 delay-200 w-full h-full z-10 invisible sm:visible opacity-0 scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100 rounded-md"}>
                <Image className={"object-cover rounded-t-md w-full h-full z-10"} src={movie.thumbnailUrl} alt={movie.title} width={300} height={300} />
                <div className={"absolute flex flex-col gap-2 p-2 top-full bg-zinc-800 w-full h-fit -z-10 rounded-b-md"}>
                    <div className={"flex items-center gap-2 justify-between"}>
                        <div className={"flex items-center gap-2"}>
                            <div
                                onClick={() => router.push(`/watch/${movie.id}`)}
                                className={"bg-white text-xl hover:bg-neutral-300 rounded-full p-2"}
                            >
                                <BsFillPlayFill />
                            </div>
                            <FavoriteButton movieId={movie.id} />
                        </div>
                        <div
                            onClick={handleOpen}
                        >
                            <BiInfoCircle
                                className={"text-white hover:text-neutral-300"}
                                size={40}
                            />
                        </div>
                    </div>
                    <p className={"text-green-400 font-semibold m-0 select-none"}>
                        New <span className={"text-white"}>2023</span>
                    </p>
                    <p className={"text-white font-semibold text-sm m-0 select-none"}>
                        {movie.duration}
                    </p>
                    <p className={"text-white font-semibold text-sm m-0 select-none"}>
                        {movie.genre}
                    </p>
                </div>
            </div>
        </div>
    )
}