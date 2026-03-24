import { useState, useEffect } from "react";

export default function useBookmarks() {
    // Initialize state lazily (only runs once on mount)
    const [movies, setMovies] = useState<moviesData[]>(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("bookmarked-movies")
            return data ? JSON.parse(data) : []
        }
        return []
        
});

    // Updates localStorage when ids actually changes
    useEffect(() => {
        localStorage.setItem("bookmarked-movies", JSON.stringify(movies));
    }, [movies]);

    return [movies, setMovies] as const;
}