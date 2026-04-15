import type { ActivityFormInput, ActivityResponse } from "./types"

type CreateActivityResult = {
  activity: ActivityResponse
}

type GetActivitiesResult = {
  activities: ActivityResponse[]
}

export async function getActivities() {
  const response = await fetch("/api/activities")
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error ?? "Could not load activities")
  }

  return result as GetActivitiesResult
}

export async function createActivity(input: ActivityFormInput) {
  const response = await fetch("/api/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error ?? "Could not create activity")
  }

  return result as CreateActivityResult
}
