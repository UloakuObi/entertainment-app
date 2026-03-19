"use client"
import { useState, useEffect } from "react"
import Image from "next/image";
import movies from "@/data.json"
import Navbar from "./_components/Navbar";
import SearchBar from "./_components/SearchBar";
import MovieCard from "./_components/MovieCard";
import useBookmarks from "@/hooks/useBookmarks";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface moviesData {
  title: String;
  thumbnail: {
    trending: {
      small: String;
      large: String;
    };
    regular: {
      small: String;
      medium: String;
      large: String;
    };
  };
  year: Number;
  category: String;
  rating: String;
  isBookmarked: Boolean;
  isTrending: Boolean;
}

export default function Home() {
  const [moviesData, setMoviesData] = useState(movies["movies"]);
  const [selectedIds, setSelectedIds] = useBookmarks();

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log(moviesData)
  }, [moviesData])

  // This function handles the logic when a movieCard is clicked
  const handleBookmarkClick = (id: string) => {
    setSelectedIds((prev) => {
        // Check if the ID is already in the array
        if (prev.includes(id)) {
            // If it is, remove it
            return prev.filter(movie => movie !== id);
        } else {
            // If it's not, add it
            return [...prev, id]
        }
    });
    console.log(`Parent received click from: ${id}`);
}

  const handleFilter = (term: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (term) {
        params.set('movie-category', term)
    } else {
        params.delete('movie-category')
    }

    // This updates the URL to /movies?movie-category=movie without a full page reload
    router.push(`${pathname}?${params.toString()}`)

}

  const currentMovieCategory = searchParams.get('movie-category')
  const filteredMovies = currentMovieCategory ? 
          moviesData.filter(movie => movie.category.toLowerCase() === currentMovieCategory.toLowerCase()) 
          : moviesData

  return (
    <div className="m-4 w-screen relative">
      <Navbar variant="mobile" onButtonClick={handleFilter}/>
      <Navbar variant="desktop" onButtonClick={handleFilter}/>

      <div className="m-0 lg:ml-22">
        <SearchBar/>
        <h1 className="text-2xl font-extralight mb-6 md:text-3xl lg:text-5xl">Trending</h1>
        
        <div className="flex gap-7 overflow-x-auto">
              {filteredMovies.map(movie => {
                  if (movie.isTrending)
                      return <MovieCard
                              key={movie.title}
                              id={movie.title}
                              thumbnail={movie.thumbnail.trending!.large}
                              year={movie.year}
                              movieType={movie.category}
                              rating={movie.rating}
                              title={movie.title}
                              isBookmarked={selectedIds.includes(movie.title)}
                              onButtonClick={handleBookmarkClick} // Passing the function
                              variant="long"
                              className="flex-shrink-0"
                              />
              })}
          </div>
          <h1 className="mt-6 mb-4 font-extralight text-xl md:text-xl lg:text-3xl">Recommended for you</h1>
          <div className="flex gap-y-2 gap-x-5 sm:gap-x-6 flex-wrap mr-4">
            {filteredMovies.map(movie => {
                if (!movie.isTrending)
                    return <MovieCard
                            key={movie.title}
                            id={movie.title}
                            thumbnail={movie.thumbnail.regular!.small}
                            year={movie.year}
                            movieType={movie.category}
                            rating={movie.rating}
                            title={movie.title}
                            isBookmarked={selectedIds.includes(movie.title)}
                            className="grow-[0.98] sm:grow-[0.85] md:grow-[0.6] lg:grow-[0.25] h-fit"
                            onButtonClick={handleBookmarkClick} // Passing the function
                            />
            })}
        </div>
        </div>
    </div>
  );
}
