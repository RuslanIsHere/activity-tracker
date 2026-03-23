import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CreditCardIcon,
    LogOutIcon,
    MailIcon,
    CircleUserRoundIcon,
    UserIcon,
} from "lucide-react"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import Link from "next/link"
import { auth, signOut } from "@/lib/auth"

export default async function Header() {
    const session = await auth()
    const user = session?.user

    return (
        <header className="w-full h-16 px-6 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight">
                Activity Tracker
            </div>
            <div>
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-10 gap-2 rounded-full px-3">
                                <Avatar size="sm">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {user?.name?.charAt(0).toUpperCase() ?? "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="max-w-24 truncate text-sm">
                                    {user.name ?? "User"}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel className="pb-1 text-xs uppercase tracking-wide text-muted-foreground">
                                Account
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center hover:bg-muted">
                                <CircleUserRoundIcon />
                                <span className="truncate">{user.name ?? "User"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center hover:bg-muted">
                                <MailIcon />
                                <span className="truncate">{user.email}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut({ redirectTo: "/" })
                                }}
                            >
                                <button className="focus:bg-destructive/10 data-[variant=destructive]:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none">
                                    <LogOutIcon className="size-4 text-destructive" />
                                    <span className="text-destructive">Log out</span>
                                </button>
                            </form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-10 gap-2 rounded-full px-3">
                                <UserIcon className="size-4" />
                                <span className="text-sm">Authorisation</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href="/login" className="flex items-center w-full">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/register" className="flex items-center w-full">
                                    <CreditCardIcon className="mr-2 h-4 w-4" />
                                    Register
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>)
                }
            </div>
        </header>
    )
}
