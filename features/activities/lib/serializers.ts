type ActivityWithDate = {
  id: string
  title: string
  categoryId: string | null
  category: { id: string; name: string; color: string | null } | null
  notes: string | null
  date: Date
}

export function serializeActivity(activity: ActivityWithDate) {
  return {
    ...activity,
    date: activity.date.toISOString(),
  }
}

