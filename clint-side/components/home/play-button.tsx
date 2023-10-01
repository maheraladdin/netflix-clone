import {BsFillPlayFill} from "react-icons/bs";
import {useRouter} from "next/router";

type PlayButtonProps = {
    movieId: string;
}
export default function PlayButton({movieId}: PlayButtonProps) {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(`/watch/${movieId}`)}
            className={"flex items-center text-xs lg:text-lg font-semibold text-black bg-white hover:bg-neutral-300 rounded-xl px-3 capitalize"}
        >
            <BsFillPlayFill size={20} />
            play
        </button>
    )
}