import axios from "axios";
import {useCallback, useMemo} from "react";
import useGetCurrentUser from "@/hooks/get-current-user-hook";
import useGetFavorites from "@/hooks/get-favorites-hook";
import {AiOutlineCheck, AiOutlinePlus} from "react-icons/ai";
type FavoriteButtonProps = {
    movieId: string;
}

export default function FavoriteButton({movieId}: FavoriteButtonProps) {
    const {mutate: mutateFavorites} = useGetFavorites();
    const {data: currentUser, mutate: mutateCurrentUser} = useGetCurrentUser();

    const isFavorite = useMemo(() => {
        if (!currentUser || !currentUser.favoriteMovies) return false;
        return currentUser.favoriteMovies.includes(movieId);
    },[currentUser, movieId]);

    const toggleFavorite = useCallback(async () => {
        let response;
        if (isFavorite) {
            response = await axios.delete(`/api/movies/favorites`, {data: movieId});
        } else {
            response = await axios.post(`/api/movies/favorites`, {movieId});
        }
        await mutateCurrentUser(response.data.user);
        await mutateFavorites();

    },[movieId, isFavorite, mutateCurrentUser, mutateFavorites]);

    return (
        <div
            onClick={toggleFavorite}
            role={"button"}
            className={"border-white border-2 text-white hover:text-neutral-300 hover:border-neutral-300 rounded-full p-2"}
        >
            {
                isFavorite ?
                    <AiOutlineCheck size={18} />
                    :
                    <AiOutlinePlus size={18} />
            }
        </div>
    )
}