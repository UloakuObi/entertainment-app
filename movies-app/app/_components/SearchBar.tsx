import { Search } from 'lucide-react'
export default function SearchBar() {
    return (
        <div className="flex gap-3 items-center border border-solid border-blue-500 py-1 w-[95%]">
            <Search />
            <input type='text' 
                className='py-4 caret-[var(--color-red-500)] 
                focus:outline-none focus:border-b-1 focus:border-solid w-full focus:border-[var(--color-blue-500)]'
                placeholder='Search for movies or TV series'/>
        </div>
    )
}