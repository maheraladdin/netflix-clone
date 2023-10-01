import useSWR from "swr";

type getRandomMovieHookType = {
    data: {
        message: string;
        randomMovie: {
            id: string;
            title: string;
            description: string;
            videoUrl: string;
            thumbnailUrl: string;
            genre: string;
            duration: string;
        }
    },
    error: any,
    isLoading: boolean,
}

export default function getRandomMovieHook(): getRandomMovieHookType {
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