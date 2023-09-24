import useSWR from "swr";

export default function getRandomMovieHook() {
    const { data, error, isLoading } = useSWR("/api/movies/random",{
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