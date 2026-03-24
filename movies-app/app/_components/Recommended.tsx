import MovieCard from "./MovieCard"

interface moviesData {
    id: string;
    title: string;
    thumbnail: {
        trending?: {
            small: string;
            large: string;
        };
        regular: {
            small: string;
            medium: string;
            large: string;
        };
    };
    year: Number;
    category: string;
    rating: string;
    isBookmarked: Boolean;
    isTrending: Boolean;
}

interface RecommendedProps {
    data: moviesData[];
    selectedIds: string[];
    handleBookmarkClick: (id: string) => void;
}

export default function Recommended({ data, selectedIds, handleBookmarkClick } : RecommendedProps) {
    return (
        <>
        <h1 className="mt-6 mb-4 font-extralight text-xl md:text-xl lg:text-3xl">
            Recommended for you
        </h1>
        <div className="flex gap-y-2 gap-x-5 sm:gap-x-6 flex-wrap mr-4">
                      {data.map(movie => {
                          if (!movie.isTrending)
                              return <MovieCard
                                      key={movie.id}
                                      id={movie.id}
                                      thumbnail={movie.thumbnail.regular!.small}
                                      year={movie.year}
                                      movieType={movie.category}
                                      rating={movie.rating}
                                      title={movie.title}
                                      isBookmarked={selectedIds.includes(movie.id)}
                                      onButtonClick={handleBookmarkClick} // Passing the function
                                      className="grow-[0.98] sm:grow-[0.85] md:grow-[0.6] lg:grow-[0.25] h-fit"
                                      />
                      })}
                  </div>
    </>
    )
}