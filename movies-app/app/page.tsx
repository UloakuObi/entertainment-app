"use client"
import { useState, useEffect } from "react"
import movies from "@/data1.json"
import Navbar from "./_components/Navbar";
import SearchBar from "./_components/SearchBar";
import Trending from "./_components/Trending";
import Recommended from "./_components/Recommended";
import SearchResults from "./_components/SearchResults";
import useBookmarks from "@/hooks/useBookmarks";
import getMovies from "@/lib/getMovies";
import getMovieDetails from '@/lib/getMovieDetails'
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ModalOverlay from "./_components/ModalOverlay";

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
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

interface OmdbMovieData {
    Title:string; 
    Year: string;
    imdbID: string;
    Type: string; 
    Poster: string;
}

interface MovieDetails {
    Title:string; 
    Year: string;
    imdbID: string;
    Type: string; 
    Poster: string;
    Plot?: string;
    Runtime?: string;
    imdbRating?: string;
    Director?: string;
    Actors?: string;
    Genre?: string;
}

export default function Home() {
  const [moviesData, setMoviesData] = useState(movies["movies"]);
  const [searchResults, setSearchResults] = useState([])
  const [selectedIds, setSelectedIds] = useBookmarks();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('title')

  useEffect(() => {
    console.log(moviesData)
  }, [moviesData])

  useEffect(() => {
    if (!searchQuery) return

    const fetchMovies = async () => {
      const data = await getMovies(searchQuery)
      const normalized = data.Search.map((movie: OmdbMovieData) => ({
        id: movie.imdbID, 
        title: movie.Title,       
        thumbnail: { regular: { small: movie.Poster } }, // Wrap the URL
        year: movie.Year,
        category: movie.Type,
        rating: "N/A",
        isBookmarked: false,
        isTrending: false
      }));
      setSearchResults(normalized);
    }

    fetchMovies()

  }, [searchQuery])

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

 const handleMovieClick = async(id: string) => {
        const data = await getMovieDetails(id)
        setSelectedMovie(data)
    }

  const currentMovieCategory = searchParams.get('movie-category')
  const filteredMovies: moviesData[] = currentMovieCategory ? 
          moviesData.filter(movie => movie.category.toLowerCase() === currentMovieCategory.toLowerCase()) 
          : moviesData

  return (
    <div className="m-4 w-screen relative">
      <Navbar variant="mobile" onButtonClick={handleFilter}/>
      <Navbar variant="desktop" onButtonClick={handleFilter}/>

      <div className="m-0 lg:ml-22">
        <SearchBar/>
        {searchQuery ? (
          <>
            <SearchResults
              data={searchResults}
              handleMovieClick={handleMovieClick}
              handleBookmarkClick={handleBookmarkClick}
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
              selectedIds={selectedIds}
              handleBookmarkClick={handleBookmarkClick}
            />
            <Recommended 
              data={filteredMovies}
              selectedIds={selectedIds}
              handleBookmarkClick={handleBookmarkClick}
            />
          </>
        )} 
      </div>
    </div>
  );
}
