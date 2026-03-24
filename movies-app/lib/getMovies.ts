export default async function getMovies(query: string) {
    const res = await fetch(`/api/movies?title=${query}`)

    if (!res.ok) {
        throw new Error("Failed to fetch movies from Omdb-api")
    }

    return res.json()
}