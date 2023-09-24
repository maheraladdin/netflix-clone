import MovieCard from "@/components/movie-card";

type MoviesListProps = {
    title: string,
    movies: {
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        thumbnailUrl: string;
        genre: string;
        duration: string;
    }[]
}

export default function MoviesList({movies, title}: MoviesListProps) {
    if(!movies) return null;

    return (
        <section className={"flex flex-col gap-6 container mx-auto px-5 py-6"}>
            <h2 className={"capitalize text-white text-2xl font-bold select-none"}>{title}</h2>
            <div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full justify-between"}>
                {movies.map(movie => (
                    <MovieCard key={movie.title} movie={movie} />
                ))}
            </div>
        </section>
    )
}