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

interface TrendingProps {
    data: moviesData[];
    selectedIds: string[];
    handleBookmarkClick: (id: string) => void;
}

export default function Trending({ data, selectedIds, handleBookmarkClick } : TrendingProps) {
    return (
        <>
        <h1 className="text-2xl font-extralight mb-6 md:text-3xl lg:text-5xl">
          Trending
        </h1>
        <div className="flex gap-7 overflow-x-auto">
                      {data.map(movie => {
                          if (movie.isTrending)
                              return <MovieCard
                                      key={movie.id}
                                      id={movie.id}
                                      thumbnail={movie.thumbnail.trending!.large}
                                      year={movie.year}
                                      movieType={movie.category}
                                      rating={movie.rating}
                                      title={movie.title}
                                      isBookmarked={selectedIds.includes(movie.id)}
                                      onButtonClick={handleBookmarkClick} // Passing the function
                                      variant="long"
                                      className="shrink-0"
                                      />
                      })}
                  </div>
    </>
    )
}