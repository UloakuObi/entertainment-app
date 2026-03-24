"use client"
import movies from "@/data1.json"
import { useState, useEffect } from "react"
import Navbar from "../_components/Navbar"
import MovieCard from "../_components/MovieCard"
import useBookmarks from "@/hooks/useBookmarks";

interface moviesData {
    id: string;
    thumbnail: string;
    year: string;
    movieType: string;
    rating: string;
    title: string;
    trending: string;
}

export default function BookmarksPage() {

    const [savedIds, setSavedIds] = useBookmarks();
    const [moviesData, setMoviesData] = useState(movies["movies"]);

    // Filter the full list to only show what the user picked
    const bookmarkedMovies = moviesData.filter(movie => savedIds.includes(movie.id))

    // This function handles the logic when a movieCard is clicked
    const handleBookmarkClick = (id: string) => {
        setSavedIds((prev) => {
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
        return moviesData.filter(movie => movie.category === term)
    }

    return (
        <div className="m-4 w-screen relative">
            <Navbar variant="mobile" onButtonClick={handleFilter}/>
            <Navbar variant="desktop" onButtonClick={handleFilter}/>
            <div className="m-0 lg:ml-22">
                <h1 className="text-2xl mb-4">Booksmarks Page</h1>
                <div className="flex gap-y-2 gap-x-5 sm:gap-x-6 flex-wrap mr-4">
                    {bookmarkedMovies.map(movie => {
                        return <MovieCard
                                key={movie.id}
                                id={movie.id}
                                thumbnail={movie.thumbnail.regular!.small}
                                year={movie.year}
                                movieType={movie.category}
                                rating={movie.rating}
                                title={movie.title}
                                // className="grow-1 h-fit"
                                isBookmarked={savedIds.includes(movie.id)}
                                onButtonClick={handleBookmarkClick} // Passing the function
                                />
                    })}
                </div>
            </div>
        </div>
    )
}