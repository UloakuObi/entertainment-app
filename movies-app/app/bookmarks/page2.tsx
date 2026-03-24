"use client"

export const dynamic = 'force-dynamic'; // Prevent prerendering

import movies from "@/data1.json"
import { useState, useEffect } from "react"
import Navbar from "../_components/Navbar"
import MovieCard from "../_components/MovieCard"
import useBookmarks from "@/hooks/useBookmarks";
import { MouseEvent } from "react";

export default function BookmarksPage() {

    const [bookmarks, setBookmarks] = useBookmarks();
    //const [moviesData, setMoviesData] = useState(movies["movies"]);
    const [moviesData, setMoviesData] = useState<moviesData[]>([]);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);

        //Lazy load JSON ONLY on client
        import("@/data1.json").then((data) => {
            setMoviesData(data.movies);
        });
    }, []);

    // This prevents the server from ever trying to read 'bookmarks'
    if (!hasMounted) {
        return <div className="m-4">Loading bookmarks...</div>; 
    }

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
        return moviesData.filter(movie => movie.category === term)
    }

    return (
        <div className="m-4 w-screen relative">
            <Navbar variant="mobile" onButtonClick={handleFilter}/>
            <Navbar variant="desktop" onButtonClick={handleFilter}/>
            <div className="m-0 lg:ml-22">
                <h1 className="text-2xl font-extralight mb-6 md:text-3xl lg:text-5xl4">
                    Booksmarks
                </h1>
                <div className="flex gap-y-2 gap-x-5 sm:gap-x-6 flex-wrap mr-4 w-[96%]">
                    {bookmarks.map(movie => {
                        return <MovieCard
                                key={movie.id}
                                id={movie.id}
                                movie={movie}
                                thumbnail={movie.thumbnail?.regular?.small}
                                year={movie.year}
                                movieType={movie.category}
                                rating={movie.rating}
                                title={movie.title}
                                className="grow-[0.98] sm:grow-[0.5] md:grow-[0.45] lg:grow-[0.25]"
                                isBookmarked={bookmarks.some((bookmark: moviesData) => bookmark.id === movie.id)}
                                onButtonClick={toggleBookmark}
                                />
                    })}
                </div>
            </div>
        </div>
    )
}