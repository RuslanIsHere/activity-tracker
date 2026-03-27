import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Current streak",
    value: "0 days",
    description: "Keep showing up and your streak will start here.",
  },
  {
    title: "This week",
    value: "0 activities",
    description: "Your weekly activity count will appear here.",
  },
  {
    title: "Focus",
    value: "Calendar MVP",
    description: "Next step is adding real activity data to the calendar.",
  },
]

export default function DashboardStats() {
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
