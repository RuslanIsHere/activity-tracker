"use client"

import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/features/categories/api"
import type { CategoryResponse } from "@/features/categories/types"

type CategoryManagerProps = {
  categories: CategoryResponse[]
  onCategoryCreated: (category: CategoryResponse) => void
  onCategoryUpdated: (category: CategoryResponse) => void
  onCategoryDeleted: (categoryId: string) => void
}

export default function CategoryManager({
  categories,
  onCategoryCreated,
  onCategoryUpdated,
  onCategoryDeleted,
}: CategoryManagerProps) {
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState("")
  const [message, setMessage] = useState("")

  async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newCategoryName.trim()) {
      setMessage("Add a category name.")
      return
    }

    try {
      const result = await createCategory({ name: newCategoryName })
      onCategoryCreated(result.category)
      setNewCategoryName("")
      setMessage("")
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not create category."
      )
    }
  }

  async function handleUpdateCategory(categoryId: string) {
    if (!editingCategoryName.trim()) {
      setMessage("Add a category name.")
      return
    }

    try {
      const result = await updateCategory(categoryId, {
        name: editingCategoryName,
      })
      onCategoryUpdated(result.category)
      setEditingCategoryId(null)
      setEditingCategoryName("")
      setMessage("")
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not update category."
      )
    }
  }

  async function handleDeleteCategory(categoryId: string) {
    try {
      await deleteCategory(categoryId)
      onCategoryDeleted(categoryId)
      setMessage("")
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not delete category."
      )
    }
  }

  return (
    <div className="space-y-3 rounded-lg border bg-muted/20 p-3">
      <form className="flex gap-2" onSubmit={handleCreateCategory}>
        <Input
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.target.value)}
          placeholder="New category"
        />
        <Button type="submit" variant="secondary">
          Add
        </Button>
      </form>

      {categories.length ? (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center gap-2">
              {editingCategoryId === category.id ? (
                <>
                  <Input
                    value={editingCategoryName}
                    onChange={(event) =>
                      setEditingCategoryName(event.target.value)
                    }
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleUpdateCategory(category.id)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {category.name}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingCategoryId(category.id)
                      setEditingCategoryName(category.name)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  )
}
