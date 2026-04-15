import type { CategoryInput } from "./types"

type CategoryValidationResult =
  | {
      success: true
      data: CategoryInput
    }
  | {
      success: false
      error: string
    }

export function validateCategoryInput(input: unknown): CategoryValidationResult {
  if (!input || typeof input !== "object") {
    return { success: false, error: "Invalid category payload" }
  }

  const data = input as Record<string, unknown>
  const name = typeof data.name === "string" ? data.name.trim() : ""

  if (!name) {
    return { success: false, error: "Category name is required" }
  }

  if (name.length > 40) {
    return { success: false, error: "Category name is too long" }
  }

  return {
    success: true,
    data: { name },
  }
}
