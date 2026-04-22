import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ActivityIcon,
  CircleUserRoundIcon,
  CreditCardIcon,
  LogOutIcon,
  MailIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { auth, signOut } from "@/lib/auth"

export default async function Header() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <ActivityIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Activity Tracker
            </p>
            <p className="text-base font-semibold tracking-tight">Daily dashboard</p>
          </div>
        </Link>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 gap-2 rounded-full px-3">
                <Avatar size="sm">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-28 truncate text-sm sm:inline">
                  {user.name ?? "User"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
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
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="rounded-full px-4">
              <Link href="/register">
                <CreditCardIcon className="size-4" />
                <span>Create account</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
