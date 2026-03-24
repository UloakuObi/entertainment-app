
"use client"
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import type FormEvent from 'react'
import { useRouter, usePathname } from "next/navigation";

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
        <div className="flex gap-3 items-center py-1 w-[95%]">
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
