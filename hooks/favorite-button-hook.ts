import useGetFavorites from "@/hooks/get-favorites-hook";
import useGetCurrentUser from "@/hooks/get-current-user-hook";
import {useCallback, useMemo} from "react";
import axios from "axios";
import {AiOutlineCheck, AiOutlinePlus} from "react-icons/ai";

export default function useFavoriteButton(movieId: string) {
    const {mutate: mutateFavorites} = useGetFavorites();
    const {data, mutate: mutateCurrentUser} = useGetCurrentUser();

    const currentUser = data?.user;

    const isFavorite = useMemo(() => {
        const favoriteIds = data?.user?.favoriteIds || [];
        return favoriteIds.includes(movieId);
    },[currentUser, movieId]);

    const toggleFavorite = useCallback(async () => {
        let response;
        if (isFavorite) {
            response = await axios.delete(`/api/movies/favorites`, {data: {movieId}});
        } else {
            response = await axios.post(`/api/movies/favorites`, {movieId});
        }
        const favoriteIds = response.data.user.favoriteIds;
        await mutateCurrentUser({
            ...currentUser,
            favoriteIds
        });
        await mutateFavorites();

    },[movieId, isFavorite, currentUser, mutateCurrentUser, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return {
        Icon,
        toggleFavorite
    }
}