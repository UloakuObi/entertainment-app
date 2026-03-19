import { Search } from 'lucide-react'
export default function SearchBar() {
    return (
        <div className="flex gap-3 items-center border border-solid border-blue-500 py-4 pl-4">
            <Search />
            <input type='text' 
                className='border-b-1 border-solid w-[95%] py-4 caret-[var(--color-red-500)] 
                focus:outline-none focus:border-[var(--color-blue-500)]'
                placeholder='Search for movies or TV series'/>
        </div>
    )
}