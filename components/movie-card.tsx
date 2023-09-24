import Image from "next/image";

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
    return (
        <div role={"button"} className={"group bg-zinc-900 col-span relative h-[12vw]"}>
            <Image className={"object-cover transition-all duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-full"} src={movie.thumbnailUrl} alt={movie.title} width={300} height={300} />
            <div>
                <Image className={"opacity-0 absolute top-0 transition-all duration-300 z-10 invisible sm:visible delay-200 w-full h-full object-cover scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100"} src={movie.thumbnailUrl} alt={movie.title} width={300} height={300} />

            </div>
        </div>
    )
}