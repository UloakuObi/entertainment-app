
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutGrid, Film, MonitorPlay, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"

interface SidebarProps {
    className?: string;
    variant?: "desktop" | "mobile" | undefined;
    onButtonClick: (term: string) => void;
}

export default function Navbar({ className, variant, onButtonClick }: SidebarProps) {

    const navbarOrientation = variant === "desktop" ? "hidden lg:block" : "block lg:hidden" 
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentType = searchParams.get('movie-category')
    
    return (
        <div className={`${navbarOrientation} ${className}`}>
            {/* DESKTOP NAVBAR */}
            <div className="hidden lg:block">
            <div className={`border border-solid border-[#161D27] rounded-lg bg-[#161D27] flex flex-col 
                items-center justify-between py-4 w-[4rem] min-h-screen absolute`}>
                <aside className={`flex gap-4 flex-col items-center`}>
                    <Image
                        src="/assets/logo.svg"
                        width={32}
                        height={25.6}
                        alt="Movies app logo"
                        className="m-auto mb-12 pb-8"
                        />
                    <div className={`flex flex-col gap-4`}>
                        <Link href="/" className={`mx-auto cursor-pointer group`}>
                            <LayoutGrid className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                                ${pathname==="/" && !currentType ? "text-white" : ""}`}/>
                        </Link>
                        <Button variant="ghost" onClick={() => onButtonClick("Movie")} className="cursor-pointer group">
                            <Film className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                                ${pathname==="/" && currentType === 'Movie' ? "text-white" : ""}`}/>
                        </Button>
                        <Button variant="ghost" onClick={() => onButtonClick("TV Series")} className="cursor-pointer group">
                            <MonitorPlay className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                                ${pathname==="/" && currentType === 'TV Series' ? "text-white" : ""}`}/>
                        </Button>
                        <Link href="/bookmarks" className={`mx-auto cursor-pointer group`}>
                            <Bookmark className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                                ${pathname==="/bookmarks" ? "text-white" : ""}`}/>
                        </Link>
                    </div>
                </aside>
                <div className="">
                    <Avatar className="mx-auto">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            </div>

            {/* MOBILE NAVBAR */}
            <div className="block lg:hidden">
            <div className={`border border-solid border-white rounded-lg bg-[#161D27] 
                flex gap-2 sm:gap-4 md:gap-4 items-center justify-between 
                p-4 h-[4rem]  w-[95%] mb-4`}>
                <Image
                    src="/assets/logo.svg"
                    width={32}
                    height={25.6}
                    alt="Movies app logo"
                    className="my-auto mb-12 pb-8"
                    />
                <div className={`flex gap-1 sm:gap-2 md:gap-4`}>
                    <Link href="/" className={`my-auto cursor-pointer group`}>
                        <LayoutGrid className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                            ${pathname==="/" && !currentType ? "text-white" : ""}`}/>
                    </Link>
                    <Button variant="ghost" onClick={() => onButtonClick("Movie")} className="cursor-pointer group">
                        <Film className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                                ${pathname==="/" && currentType === 'Movie' ? "text-white" : ""}`}/>
                    </Button>
                    <Button variant="ghost" onClick={() => onButtonClick("TV Series")} className="cursor-pointer group">
                        <MonitorPlay className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                                ${pathname==="/" && currentType === 'TV Series' ? "text-white" : ""}`}/>
                    </Button>
                    <Link href="/bookmarks" className={`my-auto cursor-pointer group`}>
                        <Bookmark className={`!w-[25px] !h-[25px] text-[#5A698F] group-hover:text-red-500 
                            ${pathname==="/bookmarks" ? "text-white" : ""}`}/>
                    </Link>
                </div>
                <div className="">
                    <Avatar className="mx-auto">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            </div>
        </div>
    )
}
