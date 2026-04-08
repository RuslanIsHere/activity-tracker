import Calendar from "@/features/activities/components/calendar"

import DashboardStats from "./dashboard-stats"

type DashboardHomeProps = {
  userName?: string | null
}

export default function DashboardHome({ userName }: DashboardHomeProps) {
  return (
    <main className="px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, {userName ?? "there"}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Your main screen combines a quick overview at the top and the activity
            calendar below so everything stays in one simple flow.
          </p>
        </section>

        <DashboardStats />

        <section className="rounded-3xl border bg-card p-4 shadow-sm sm:p-6">
          <div className="mb-4 space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">Calendar</h2>
            <p className="text-sm text-muted-foreground">
              This is the first calendar shell. Daily details and activity actions
              will be added next.
            </p>
          </div>

          <Calendar />
        </section>
      </div>
    </main>
  )
}
