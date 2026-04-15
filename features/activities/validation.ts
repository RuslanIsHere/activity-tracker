import type { ActivityFormInput } from "./types"

type ActivityValidationResult =
  | {
      success: true
      data: ActivityFormInput
    }
  | {
      success: false
      error: string
    }

function isValidDateInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00.000Z`)

  return !Number.isNaN(date.getTime())
}

export function validateActivityInput(input: unknown): ActivityValidationResult {
  if (!input || typeof input !== "object") {
    return { success: false, error: "Invalid activity payload" }
  }

  const data = input as Record<string, unknown>
  const title = typeof data.title === "string" ? data.title.trim() : ""
  const date = typeof data.date === "string" ? data.date : ""
  const categoryId =
    typeof data.categoryId === "string" ? data.categoryId.trim() : undefined
  const notes = typeof data.notes === "string" ? data.notes.trim() : undefined

  if (!title) {
    return { success: false, error: "Activity title is required" }
  }

  if (!isValidDateInput(date)) {
    return { success: false, error: "Activity date is required" }
  }

  return {
    success: true,
    data: {
      title,
      date,
      categoryId: categoryId || undefined,
      notes: notes || undefined,
    },
  }
}
