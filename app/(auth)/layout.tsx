import Link from "next/link"

import { Button } from "@/components/ui/button"

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <>
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Activity Tracker
          </Link>
          <Button asChild variant="ghost">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,28rem)]">
        <section className="relative overflow-hidden rounded-[2rem] border bg-slate-950 px-6 py-8 text-slate-50 shadow-xl sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.22),transparent_30%)]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-sm font-semibold shadow-sm ring-1 ring-white/15">
                AT
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-300/90">
                  Activity Tracker
                </p>
                <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Build consistency with a calmer daily workspace.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-300">
                  Sign in to review your calendar, keep routines visible, and
                  turn small repeated actions into progress you can actually see.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-sm text-slate-300">Track days</p>
                <p className="mt-2 text-2xl font-semibold">One place</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-sm text-slate-300">Stay focused</p>
                <p className="mt-2 text-2xl font-semibold">Simple flow</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-sm text-slate-300">Review progress</p>
                <p className="mt-2 text-2xl font-semibold">Week by week</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-md">
            {props.children}
          </div>
        </section>
        </div>
      </main>
    </>
  )
}
