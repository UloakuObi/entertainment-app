import MovieCard from "./MovieCard"

export default function Recommended({ data, bookmarks, toggleBookmark } : RecommendedProps) {
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
                                      movie={movie}
                                      thumbnail={movie.thumbnail.regular!.small}
                                      year={movie.year}
                                      movieType={movie.category}
                                      rating={movie.rating}
                                      title={movie.title}
                                      isBookmarked={bookmarks.some((bookmark: moviesData) => bookmark.id === movie.id)}
                                      onButtonClick={toggleBookmark}
                                      className="grow-[0.98] sm:grow-[0.85] md:grow-[0.6] lg:grow-[0.25] h-fit"
                                      />
                      })}
                  </div>
    </>
    )
}