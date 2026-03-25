import LoginForm from "./LoginForm"
import Image from "next/image"

export default function LoginPage() {
    return (
        <main className="min-w-full min-h-screen lg:flex lg:justify-center lg:items-center border border-solid border-blue-200">
            <div className="w-[min(90vw,420px)] mt-10 px-4 mx-auto lg:mx-0 md:pt-[clamp(0.85rem,2vh,8rem)]">
                <Image
                    src="/assets/logo.svg"
                    width={32}
                    height={25.6}
                    alt="Movies app logo"
                    className="m-auto mb-12 pb-8"
                    />
                <LoginForm />
            </div>
        </main>
        
    )
}