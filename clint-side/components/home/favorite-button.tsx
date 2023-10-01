import useFavoriteButton from "@/clint-side/hooks/favorite-button-hook";
type FavoriteButtonProps = {
    movieId: string;
}

export default function FavoriteButton({movieId}: FavoriteButtonProps) {
    const {toggleFavorite, Icon} = useFavoriteButton(movieId);
    return (
        <div
            onClick={toggleFavorite}
            role={"button"}
            className={"border-white border-2 text-white hover:text-neutral-300 hover:border-neutral-300 rounded-full p-2"}
        >
            <Icon size={18} />
        </div>
    )
}