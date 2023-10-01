import useSWR from "swr";

export default function useGetCurrentUser() {
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR("/api/user/current", {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    return {
        data,
        isLoading,
        error,
        mutate
    };
}