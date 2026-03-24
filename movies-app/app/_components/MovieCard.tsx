import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dot, Bookmark, Film, MonitorPlay } from 'lucide-react'

type MovieCardProps = {
    id: string;
    isBookmarked?: boolean;
    onButtonClick: (id: string) => void;
    thumbnail: string;
    year: Number;
    movieType: string;
    rating: string;
    title: string;
    variant?: string;
    className?: string;
}

export default function MovieCard({id, isBookmarked, onButtonClick, thumbnail, year, movieType, rating, variant, title, className}: MovieCardProps) {
  
    const movieIcon = movieType === "Movie" ? <Film className="text-white opacity-70"/> : <MonitorPlay className="text-white opacity-70"/>
    const imgSize = variant === "long" ? "h-[210px]" : ""
    const cardSize = variant === "long" ? "w-[480px]" : "w-[168px] sm:w-[200px] md:w-[240px]"
    const cardDesc = variant === "long" ? "absolute bottom-18 left-5 z-30" : ""
    const cardTitle = variant === "long" ? "absolute bottom-9 left-5 z-30 text-2xl" : ""
    const fontSize = variant == "long" ? "text-sm" : "text-xs"
    // h-[110px] sm:h-[180px] md:h-[210px]

    return (
    <Card className={`pt-0 relative rounded-b-none bg-[#10141E] ${cardSize} ${className}`}>
      {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
      <img
        src={thumbnail}
        alt={`${title} cover photo`}
        className={`relative z-20 rounded-b-xl aspect-video w-full ${imgSize} object-cover`}
      />

      <CardDescription className={`flex gap-1 items-center ${cardDesc}`}>
            <time dateTime="2009" className={`${fontSize} text-white opacity-70`}>{year.toString()}</time>
            <Dot style={{strokeWidth:"2px", width:"20px"}} className="text-white opacity-70"/>
            <div className="flex gap-1 items-center">
                {movieIcon}
                <p className={`${fontSize} text-white opacity-70`}>{movieType}</p>
            </div>
            <Dot style={{strokeWidth:"2px", width:"20px"}} className="text-white opacity-70"/>
            <p className={`${fontSize} text-white opacity-70`}>{rating}</p>
      </CardDescription>
      <CardTitle className={`font-medium text-white text-xl ${cardTitle}`}>
        {title}
      </CardTitle>

      <CardAction className="absolute top-3 right-3 z-35">
        <Button onClick={() => onButtonClick(id)}
            className="rounded-full w-[40px] h-[40px] bg-[#10141E]/50 cursor-pointer group">
            <Bookmark className={`!w-[20px] !h-[20px] text-white transition-colors 
                      group-hover:text-red-50 group-hover:fill-red-50 ${isBookmarked ? "fill-white" : ""}`}/>
        </Button>
      </CardAction>
        
    </Card>
  );
}