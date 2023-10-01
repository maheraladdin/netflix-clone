import useSWR from "swr";

export default function useGetMovieById(id: string) {
    const {data, error, isLoading, mutate} = useSWR(`/api/movies/${id}`, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        data,
        error,
        isLoading,
        mutate
    }
}