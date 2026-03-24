import MovieCard from "./MovieCard"

export default function Trending({ data, bookmarks, toggleBookmark } : TrendingProps) {
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
                                      movie={movie}
                                      id={movie.id}
                                      thumbnail={movie.thumbnail.trending!.large}
                                      year={movie.year}
                                      movieType={movie.category}
                                      rating={movie.rating}
                                      title={movie.title}
                                      isBookmarked={bookmarks.some((bookmark: moviesData) => bookmark.id === movie.id)}
                                      onButtonClick={toggleBookmark}
                                      variant="long"
                                      className="shrink-0"
                                      />
                      })}
                  </div>
    </>
    )
}