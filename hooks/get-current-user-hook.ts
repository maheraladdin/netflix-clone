import useSWR from "swr";

export default function useGetCurrentUser() {
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR("/api/user/current");
    return {
        data,
        isLoading,
        error,
        mutate
    };
}