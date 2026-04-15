import { Badge } from "@/components/ui/badge"
import type { ActivityResponse } from "@/features/activities/types"

type ActivityListProps = {
  activities: ActivityResponse[]
}

export default function ActivityList({ activities }: ActivityListProps) {
  if (!activities.length) {
    return (
      <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
        No activities yet.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {activities.map((activity) => (
        <li key={activity.id} className="rounded-lg border p-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium leading-tight">{activity.title}</p>
            {activity.category ? (
              <Badge variant="secondary">{activity.category.name}</Badge>
            ) : null}
          </div>

          {activity.notes ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {activity.notes}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
