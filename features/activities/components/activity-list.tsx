import { Badge } from "@/components/ui/badge"
import type { ActivityResponse } from "@/features/activities/types"
import { Button } from "@/components/ui/button"

type ActivityListProps = {
  activities: ActivityResponse[]
  editingActivityId?: string | null
  onEditActivity: (activity: ActivityResponse) => void
  onDeleteActivity: (activity: ActivityResponse) => void
}

export default function ActivityList({
  activities,
  editingActivityId,
  onEditActivity,
  onDeleteActivity,
}: ActivityListProps) {
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
        <li
          key={activity.id}
          className={
            activity.id === editingActivityId
              ? "rounded-lg border border-primary/40 bg-primary/5 p-3"
              : "rounded-lg border p-3"
          }
        >
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

          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onEditActivity(activity)}
            >
              Edit
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onDeleteActivity(activity)}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
