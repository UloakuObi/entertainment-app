import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from "@/components/ui/card"

export default function SignupForm() {
    return (
        <Card className="bg-[var(--color-blue-900)] px-6 py-10">
            <CardHeader>
                <CardTitle className="text-3xl mb-4 font-thin pt-4">Sign Up</CardTitle>
                <CardDescription className="sr-only">
                    Enter your email and a secure password below to sign up for a new account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-6">
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            required
                            className="border-b-1 border-solid border-[var(--color-blue-500)] pb-4 pl-4 caret-[var(--color-red-500)] 
                            focus:outline-none focus:border-[var(--color-blue-500)]"
                        />

                        <Label htmlFor="password" className="sr-only">Password</Label>
                        <input id="password" type="password" required className="border-b-1 border-solid border-[var(--color-blue-500)] pb-4 pl-4 caret-[var(--color-red-500)] 
                            focus:outline-none focus:border-[var(--color-blue-500)]" placeholder="Password"/>
                        
                        <Label htmlFor="repeat-password" className="sr-only">Repeat Password</Label>
                        <input id="repeat-password" type="password" required className="border-b-1 border-solid border-[var(--color-blue-500)] pb-4 pl-4 caret-[var(--color-red-500)] 
                            focus:outline-none focus:border-[var(--color-blue-500)]" placeholder="Repeat Password"/>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-[var(--color-red-500)] font-thin py-6 mt-8 text-white">
                        Create an account
                    </Button>
                </form>
            </CardContent>
            <div className="flex justify-center items-center">
                <p>Already have an account?</p>
                <CardAction>
                    <Button className="text-[var(--color-red-500)] font-thin" variant="link">Login</Button>
                </CardAction>
            </div>
        </Card>
    )
}