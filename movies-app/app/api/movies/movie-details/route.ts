export async function GET(req: Request) {

    // Get search query
    const { searchParams } = new URL(req.url)
    const movieID = searchParams.get("movie-id")
    
    const key = process.env.OMDB_API_KEY

    const url = `http://www.omdbapi.com/?apikey=${key}&i=${movieID}` 

    if (!movieID) {
        return Response.json("Missing query, please enter movies name to search", {status: 400})
    }

    try {
        const res = await fetch(url)

        if (!res.ok) {
            return new Response("Failed to fetch movies", {status: res.status})
        }

        const movies = await res.json()
        return Response.json(movies)

    } catch(err) {
        return new Response(`Internal server error: ${err}`, {status: 500})
    }
}