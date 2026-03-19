import { useState, useEffect } from "react";

export default function useBookmarks() {
    // Initialize state lazily (only runs once on mount)
    const [ids, setIds] = useState<string[]>(() => {
        const data = localStorage.getItem("bookmarked-movies")
        return data ? JSON.parse(data) : []
});

    // Updates localStorage when ids actually changes
    useEffect(() => {
        localStorage.setItem("bookmarked-movies", JSON.stringify(ids));
    }, [ids]);

    return [ids, setIds] as const;
}