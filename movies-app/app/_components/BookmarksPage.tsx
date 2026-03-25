"use client"

import movies from "@/data1.json"
import { useState, Suspense } from "react"
import Navbar from "./Navbar"
import MovieCard from "./MovieCard"
import useBookmarks from "@/hooks/useBookmarks";
import { MouseEvent } from "react";

function BookmarksContent() {

    const [bookmarks, setBookmarks] = useBookmarks();
    const [moviesData, setMoviesData] = useState(movies["movies"]);
    //const [moviesData, setMoviesData] = useState<moviesData[]>([]);

    // useEffect(() => {
    //     //Lazy load JSON ONLY on client
    //     import("@/data1.json").then((data) => {
    //         setMoviesData(data.movies);
    //     });
    // }, []);

    const toggleBookmark = (e:MouseEvent<HTMLButtonElement | HTMLDivElement>, movie: moviesData) => {
          e.stopPropagation()

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
        <>
            <Navbar variant="mobile" onButtonClick={handleFilter}/>
            <Navbar variant="desktop" onButtonClick={handleFilter}/>
            <div className="m-0 lg:ml-22">
                <h1 className="text-2xl font-extralight mb-6 md:text-3xl lg:text-5xl4">
                    Bookmarks
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
        </>
    )
}

export default function BookmarksPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookmarksContent/>
        </Suspense>
    )
}