import {
  addUtcDays,
  getDateKey,
  getStartOfUtcWeek,
  getTodayUtcDate,
} from "@/features/activities/lib/date"

export function getCurrentStreak(activityDates: Date[]) {
  const uniqueDays = new Set(activityDates.map(getDateKey))
  const today = getTodayUtcDate()
  let streak = 0
  let cursor = today

  while (uniqueDays.has(getDateKey(cursor))) {
    streak += 1
    cursor = addUtcDays(cursor, -1)
  }

  return streak
}

export function getWeekActivityCount(activityDates: Date[]) {
  const startOfWeek = getStartOfUtcWeek(getTodayUtcDate())
  const endOfWeek = addUtcDays(startOfWeek, 7)

  return activityDates.filter((activityDate) => {
    const activityTime = activityDate.getTime()

    return (
      activityTime >= startOfWeek.getTime() &&
      activityTime < endOfWeek.getTime()
    )
  }).length
}

export function getDescriptionForStreak(streak: number) {
  if (streak === 0) {
    return "No activity today yet."
  }

  if (streak === 1) {
    return "You are active today."
  }

  return "You have kept the streak going."
}

export function getDescriptionForWeek(count: number) {
  if (count === 0) {
    return "No activities logged this week yet."
  }

  if (count === 1) {
    return "One activity logged this week."
  }

  return "Activities logged since Monday."
}

export function getDescriptionForTotal(count: number) {
  if (count === 0) {
    return "Start logging to build your history."
  }

  if (count === 1) {
    return "Your activity history has started."
  }

  return "All activities logged in your account."
}
