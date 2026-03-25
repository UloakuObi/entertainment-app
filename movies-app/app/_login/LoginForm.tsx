import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from "@/components/ui/card"

export default function LoginForm() {
    return (
        <Card className="bg-[var(--color-blue-900)] px-6 py-10">
            <CardHeader>
                <CardTitle className="text-3xl mb-4 font-thin">Login</CardTitle>
                <CardDescription className="sr-only">
                    Enter your email and password below to login to your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            required
                            className="border-b-1 border-solid border-[var(--color-blue-500)] pb-4 pl-4 caret-[var(--color-red-500)] 
                            focus:outline-none focus:border-[var(--color-blue-500)]"
                        />
                        </div>
                        <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="sr-only">Password</Label>
                            {/* <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                            Forgot your password?
                            </a> */}
                        </div>
                        <input id="password" type="password" required className="border-b-1 border-solid border-[var(--color-blue-500)] pb-4 pl-4 caret-[var(--color-red-500)] 
                            focus:outline-none focus:border-[var(--color-blue-500)]" placeholder="Password"/>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-[var(--color-red-500)] font-thin py-6 mt-8 text-white">
                        Login to your account
                    </Button>
                </form>
            </CardContent>
            <div className="flex justify-center items-center">
                <p>Don't have an account?</p>
                <CardAction>
                    <Button className="text-[var(--color-red-500)] font-thin" variant="link">Sign Up</Button>
                </CardAction>
            </div>
        </Card>
    )
}