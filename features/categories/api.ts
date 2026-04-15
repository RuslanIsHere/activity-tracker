import type { CategoryInput, CategoryResponse } from "./types"

type GetCategoriesResult = {
  categories: CategoryResponse[]
}

type CategoryResult = {
  category: CategoryResponse
}

export async function getCategories() {
  const response = await fetch("/api/categories")
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error ?? "Could not load categories")
  }

  return result as GetCategoriesResult
}

export async function createCategory(input: CategoryInput) {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error ?? "Could not create category")
  }

  return result as CategoryResult
}

export async function updateCategory(id: string, input: CategoryInput) {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error ?? "Could not update category")
  }

  return result as CategoryResult
}

export async function deleteCategory(id: string) {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error ?? "Could not delete category")
  }

  return result as { category: { id: string } }
}
