import useSWR from "swr";
export default function useGetFavorites() {
    const {data, error, isLoading, mutate} = useSWR("/api/movies/favorites", {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    return {
        favorites: data,
        error,
        isLoading,
        mutate
    }
}