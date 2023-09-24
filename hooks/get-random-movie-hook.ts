import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function getRandomMovieHook() {
    const { data, error, isLoading } = useSWR("/api/movies/random", fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading,
    }
}