import MovieCard from "./MovieCard"

interface moviesData {
    id: string;
    title: string;
    thumbnail: {
        regular: {
            small: string;
        };
    };
    year: Number;
    category: string;
    rating: string;
    isBookmarked: Boolean;
    isTrending: Boolean;
}

interface SearchResultsProps {
    data: moviesData[];
    handleMovieClick: (id: string) => void;
    handleBookmarkClick: (id: string) => void;
}

export default function SearchResults({ data, handleMovieClick, handleBookmarkClick } : SearchResultsProps) {
    return (
        <div className='p-4 flex flex-wrap gap-x-8 gap-y-4'>
            {data.length != 0 && data.map(movie => (
                <div 
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="cursor-pointer hover:scale-105 transition-transform">
                <MovieCard 
                    id={movie.id}
                    isBookmarked={false}
                    onButtonClick={handleBookmarkClick}
                    thumbnail={movie.thumbnail.regular.small}
                    year={movie.year}
                    movieType={movie.category}
                    rating="N/A"
                    title={movie.title}
                    className="grow-[0.98] sm:grow-[0.85] md:grow-[0.6] lg:grow-[0.25] h-fit"
            />
            </div>))}
        </div>
    )
}