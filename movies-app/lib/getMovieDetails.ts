export default async function getMovieDetails(id: string) {
    const res = await fetch(`/api/movies/movie-details?movie-id=${id}`)

    if (!res.ok) {
        throw new Error(`Failed to fetch movie with id: ${id}`)
    }

    return res.json()
}