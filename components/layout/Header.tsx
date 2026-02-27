import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CreditCardIcon,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import Link from "next/link"
import { auth } from "@/lib/auth"

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
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Avatar>
                                    <AvatarFallback>
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="flex items-center hover:bg-muted">
                                    <UserIcon/>Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center hover:bg-muted">
                                    <SettingsIcon/>Settings
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem variant="destructive" className="flex items-center">
                                    <LogOutIcon />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Authorisation</Button>
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