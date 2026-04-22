import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getCurrentStreak,
  getDescriptionForStreak,
  getDescriptionForTotal,
  getDescriptionForWeek,
  getWeekActivityCount,
} from "@/features/dashboard/lib/stats"

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
