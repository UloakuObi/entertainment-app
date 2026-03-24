// import { MouseEvent } from 'react';

interface moviesData {
    id: string;
    title: string;
    thumbnail: {
        trending?: {
        small: string;
        large: string;
        };
        regular: {
        small: string;
        medium: string;
        large: string;
        };
    };
    year: number;
    category: string;
    rating: string;
    isBookmarked: boolean;
    isTrending: boolean;
}

interface NormalizedMoviesData {
    id: string;
    title: string;
    thumbnail: {
        regular: {
            small: string;
            medium: string;
            large: string;
        };
    };
    year: number;
    category: string;
    rating: string;
    isBookmarked: boolean;
    isTrending: boolean;
}

interface OmdbMovieData {
    Title:string; 
    Year: string;
    imdbID: string;
    Type: string; 
    Poster: string;
}

interface MovieDetails {
    Title:string; 
    Year: string;
    imdbID: string;
    Type: string; 
    Poster: string;
    Plot?: string;
    Runtime?: string;
    imdbRating?: string;
    Director?: string;
    Actors?: string;
    Genre?: string;
}

interface TrendingProps {
    data: moviesData[];
    bookmarks: moviesData[];
    toggleBookmark: (e: MouseEvent<HTMLButtonElement>, movie: moviesData) => void;
}

type MovieCardProps = {
    movie: moviesData;
    id: string;
    isBookmarked?: boolean;
    onButtonClick: (e: MouseEvent<HTMLButtonElement>, movie: moviesData) => void;
    thumbnail: string;
    year: number;
    movieType: string;
    rating: string;
    title: string;
    variant?: string;
    className?: string;
}

interface RecommendedProps {
    data: moviesData[];
    bookmarks: moviesData[];
    toggleBookmark: (e: MouseEvent<HTMLButtonElement>, movie: moviesData) => void;
}

interface ModalOverlayProps {
    selectedMovie: MovieDetails;
    setSelectedMovie: React.Dispatch<React.SetStateAction<MovieDetails | null>> 
}

interface SearchResultsProps {
    data: NormalizedMoviesData[];
    bookmarks: moviesData[];
    handleMovieClick: (id: string) => void;
    toggleBookmark: (e: MouseEvent<HTMLButtonElement>, movie: NormalizedMoviesData) => void;
}

