import Image from "next/image"
import { Star } from "lucide-react";
import { Dot } from "lucide-react";

export default function ModalOverlay({ selectedMovie, setSelectedMovie } : ModalOverlayProps) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center 
            p-6 z-50 overflow-y-auto" 
            onClick={() => setSelectedMovie(null)}>
                    <div className="bg-gray-900 p-8 rounded-lg max-w-2xl 
                        border border-gray-700" 
                        onClick={e => e.stopPropagation()}>
                        <Image
                            src={selectedMovie.Poster}
                            alt={`poster image for ${selectedMovie.Title}`}
                            width={300}
                            height={150}
                        />
                        <span className='flex items-center mt-2'>
                            <h2 className="text-2xl font-bold">{selectedMovie.Title}</h2>
                            <p className="text-blue-400 flex items-center pl-2">
                                <Star className='text-yellow-300 fill-yellow-300'/> 
                                <p className='pl-1'>{selectedMovie.imdbRating}</p>
                            </p>
                        </span>
                        <p className="text-blue-400 mt-2 flex gap-x-1">
                            {`${selectedMovie.Year}`}  <Dot/>  {selectedMovie.Genre}  <Dot/>  {selectedMovie.Runtime}
                        </p>
                        <p className="mt-2 text-gray-300">{selectedMovie.Plot}</p>
                        <p className="text-gray-300 mt-2"><strong>Director:</strong> {selectedMovie.Director}</p>
                        <p className="text-gray-300"><strong>Actors:</strong> {selectedMovie.Actors}</p>
                        <button 
                            className="mt-6 text-red-500 underline"
                            onClick={() => setSelectedMovie(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
    )
}