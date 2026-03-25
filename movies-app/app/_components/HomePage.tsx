"use client"
import { useState, useEffect, Suspense } from "react"
import movies from "@/data1.json"
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Trending from "./Trending";
import Recommended from "./Recommended";
import SearchResults from "./SearchResults";
import useBookmarks from "@/hooks/useBookmarks";
import getMovies from "@/lib/getMovies";
import getMovieDetails from '@/lib/getMovieDetails'
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ModalOverlay from "./ModalOverlay";
import { MouseEvent } from "react";

function HomeContent() {
  const [moviesData, setMoviesData] = useState(movies["movies"]);
  const [searchResults, setSearchResults] = useState([])
  const [bookmarks, setBookmarks] = useBookmarks();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('title')

  // useEffect(() => {
  //   console.log(moviesData)
  //   console.log(searchQuery, searchResults)
  // }, [moviesData])

  useEffect(() => {
    if (!searchQuery) return

    const fetchMovies = async () => {
      try {
        const data = await getMovies(searchQuery)
        const normalized = data.Search.map((movie: OmdbMovieData) => ({
          id: movie.imdbID, 
          title: movie.Title,       
          thumbnail: { regular: { 
            small: movie.Poster, 
            medium: movie.Poster, 
            large: movie.Poster } }, // Wrap the URL
          year: movie.Year,
          category: movie.Type,
          rating: "N/A",
          isBookmarked: false,
          isTrending: false
        }));
        setSearchResults(normalized);

      } catch(err) {
        console.log("Failed to fetch movies", err)
      }
      
    }

    fetchMovies()

  }, [searchQuery])

  const toggleBookmark = (e:MouseEvent<HTMLButtonElement | HTMLDivElement>, movie: moviesData) => {
      e.stopPropagation()
      console.log("What is this movie object?", movie);
      console.log("Toggle clicked for:", movie.title); // Is this appearing?
      setBookmarks(prev => {
          const exists = prev.find(m => m.id === movie.id)

          if (exists) {
              return prev.filter(m => m.id !== movie.id)
          }

          return [...prev, {
          ...movie
      }]
      })
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

 const handleMovieClick = async(id: string) => {
        const data = await getMovieDetails(id)
        setSelectedMovie(data)
    }

  const currentMovieCategory = searchParams.get('movie-category')
  const filteredMovies: moviesData[] = currentMovieCategory ? 
          moviesData.filter(movie => movie.category.toLowerCase() === currentMovieCategory.toLowerCase()) 
          : moviesData

  return (
    <>
      <Navbar variant="mobile" onButtonClick={handleFilter}/>
      <Navbar variant="desktop" onButtonClick={handleFilter}/>

      <div className="m-0 lg:ml-22">
        <SearchBar/>
        {searchQuery ? (
          <>
            <SearchResults
              data={searchResults}
              bookmarks={bookmarks}
              handleMovieClick={handleMovieClick}
              toggleBookmark={toggleBookmark}
            />
            {selectedMovie && <ModalOverlay 
                selectedMovie={selectedMovie} 
                setSelectedMovie={setSelectedMovie}
                />
              }
          </>
        ) : (
          <>
            <Trending 
              data={filteredMovies}
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
            />
            <Recommended 
              data={filteredMovies}
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
            />
          </>
        )} 
      </div>
    </>
  );
}

export default function HomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeContent/>
        </Suspense>
    )
}
