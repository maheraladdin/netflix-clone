import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useGetCurrentUser() {
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR("/api/user/current", fetcher);
    return {
        data,
        isLoading,
        error,
        mutate
    };
}