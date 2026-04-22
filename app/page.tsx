import { auth } from "@/lib/auth"
import Link from "next/link"

import Header from "@/components/layout/Header"
import DashboardHome from "@/features/dashboard/components/dashboard-home"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const session = await auth()
  const user = session?.user

  if (user) {
    return (
      <>
        <Header />
        <DashboardHome userName={user.name} />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="px-6 py-12 sm:px-8 lg:px-12">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs tracking-wide">
              Activity Tracker
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Build momentum with simple daily tracking.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Track workouts, study sessions, habits, and routines in one clean
                place. Stay consistent and make your progress visible day by day.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">Create account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Track anything</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Log habits, workouts, study time, and daily routines.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Stay consistent</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Keep your activity history visible and easy to review.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">See progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Turn small daily actions into clear long-term momentum.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/10 via-transparent to-primary/5 blur-2xl" />
            <div className="relative space-y-4">
              <Card className="rounded-3xl border shadow-lg">
                <CardHeader>
                  <CardTitle>Today</CardTitle>
                  <CardDescription>Simple preview of your daily flow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border bg-muted/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Morning workout</span>
                      <span className="text-xs text-green-600">Done</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      35 min completed before work.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border bg-background p-4">
                      <p className="text-sm text-muted-foreground">Current streak</p>
                      <p className="mt-2 text-2xl font-semibold">6 days</p>
                    </div>
                    <div className="rounded-2xl border bg-background p-4">
                      <p className="text-sm text-muted-foreground">This week</p>
                      <p className="mt-2 text-2xl font-semibold">12 logs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="ml-auto max-w-xs rounded-3xl border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Why it helps</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    A clean record of daily actions makes it easier to stay honest,
                    notice patterns, and keep going.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
