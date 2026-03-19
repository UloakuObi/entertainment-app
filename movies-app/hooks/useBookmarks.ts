import { useState, useEffect } from "react";

export default function useBookmarks() {
    const [ids, setIds] = useState<string[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("bookmarked-movies");
        if (data) setIds(JSON.parse(data));
    }, []);

    useEffect(() => {
        localStorage.setItem("bookmarked-movies", JSON.stringify(ids));
    }, [ids]);

    return [ids, setIds] as const;
}