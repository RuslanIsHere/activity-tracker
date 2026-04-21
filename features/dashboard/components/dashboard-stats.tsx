import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function getTodayUtcDate() {
  const now = new Date()

  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date)
  nextDate.setUTCDate(nextDate.getUTCDate() + days)

  return nextDate
}

function getStartOfWeek(date: Date) {
  const day = date.getUTCDay()
  const daysSinceMonday = day === 0 ? 6 : day - 1

  return addDays(date, -daysSinceMonday)
}

function getCurrentStreak(activityDates: Date[]) {
  const uniqueDays = new Set(activityDates.map(getDateKey))
  const today = getTodayUtcDate()
  let streak = 0
  let cursor = today

  while (uniqueDays.has(getDateKey(cursor))) {
    streak += 1
    cursor = addDays(cursor, -1)
  }

  return streak
}

function getWeekActivityCount(activityDates: Date[]) {
  const startOfWeek = getStartOfWeek(getTodayUtcDate())
  const endOfWeek = addDays(startOfWeek, 7)

  return activityDates.filter((activityDate) => {
    const activityTime = activityDate.getTime()

    return (
      activityTime >= startOfWeek.getTime() &&
      activityTime < endOfWeek.getTime()
    )
  }).length
}

function getDescriptionForStreak(streak: number) {
  if (streak === 0) {
    return "No activity today yet."
  }

  if (streak === 1) {
    return "You are active today."
  }

  return "You have kept the streak going."
}

function getDescriptionForWeek(count: number) {
  if (count === 0) {
    return "No activities logged this week yet."
  }

  if (count === 1) {
    return "One activity logged this week."
  }

  return "Activities logged since Monday."
}

function getDescriptionForTotal(count: number) {
  if (count === 0) {
    return "Start logging to build your history."
  }

  if (count === 1) {
    return "Your activity history has started."
  }

  return "All activities logged in your account."
}

export default async function DashboardStats() {
  const session = await auth()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      activities: {
        select: {
          date: true,
        },
      },
    },
  })

  const activityDates = user?.activities.map((activity) => activity.date) ?? []
  const currentStreak = getCurrentStreak(activityDates)
  const weekActivityCount = getWeekActivityCount(activityDates)
  const totalActivityCount = activityDates.length

  const stats = [
    {
      title: "Current streak",
      value: `${currentStreak} ${currentStreak === 1 ? "day" : "days"}`,
      description: getDescriptionForStreak(currentStreak),
    },
    {
      title: "This week",
      value: `${weekActivityCount} ${
        weekActivityCount === 1 ? "activity" : "activities"
      }`,
      description: getDescriptionForWeek(weekActivityCount),
    },
    {
      title: "Total activities",
      value: `${totalActivityCount}`,
      description: getDescriptionForTotal(totalActivityCount),
    },
  ]

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
