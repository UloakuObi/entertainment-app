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

  const handleBookmarkClick = () => {

  }

  useEffect(() => {
    console.log(moviesData)
  }, [moviesData])

  return (
    <div className="m-4 w-screen relative">
      {/* <Navbar variant="mobile" onButtonClick={handleFilter}/>
      <Navbar variant="desktop" onButtonClick={handleFilter}/> */}
      <SearchBar/>
      <h1 className="text-4xl font-light mb-6">Trending</h1>
      
      <div className="flex gap-7 overflow-x-auto">
            {moviesData.map(movie => {
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
    </div>
  );
}
