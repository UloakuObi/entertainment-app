
"use client"
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import type FormEvent from 'react'
import { useRouter, usePathname } from "next/navigation";
// import getMovieDetails from '@/lib/getMovieDetails'
// import MovieCard from './MovieCard'
// import { Star, Dot } from 'lucide-react'

// type MovieData = {
//     Title:string; 
//     Year: string;
//     imdbID: string;
//     Type: string; 
//     Poster: string;
// }

// type MovieDetails = MovieData & {
//     Plot?: string;
//     Runtime?: string;
//     imdbRating?: string;
//     Poster?: string;
//     Director?: string;
//     Actors?: string;
//     Genre?: string;
// }

export default function SearchBar() {
    const [inputValue, setInputValue] = useState<string>("")
    const router = useRouter()
    const pathname = usePathname()

    const handlesubmit = async (e: FormEvent.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = new URLSearchParams()

        if(inputValue) {
            params.set('title', inputValue)
        }

        // This pushes the new URL and triggers the Home component to re-render
        router.push(`${pathname}?${params.toString()}`)
  
    }
  
    return (
        <div className="flex gap-3 items-center border border-solid border-gray-50/20 py-1 w-[95%]">
            <Search />
            <form onSubmit={handlesubmit} className='w-full'>
            <input type='text' 
                id='search-input'
                name='movie-name'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder='Search for movies or TV series'
                className='py-4 caret-red-500 
                focus:outline-none focus:border-b focus:border-solid w-full focus:border-blue-500'
                />
            </form>
        </div>
    )
}
