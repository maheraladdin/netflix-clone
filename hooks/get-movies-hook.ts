import useSWR from "swr";

type getMoviesHookType = {
    data: {
        message: string;
        movies: {
            id: string;
            title: string;
            description: string;
            videoUrl: string;
            thumbnailUrl: string;
            genre: string;
            duration: string;
        }[]
    },
    error: any,
    isLoading: boolean,
}

export default function useGetMovies(): getMoviesHookType {
    const {data, error, isLoading} = useSWR("/api/movies",{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    });

    return {
        data,
        error,
        isLoading,
    };
}