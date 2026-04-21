"use client"

import { FormEvent, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  createActivity,
  updateActivity,
} from "@/features/activities/api"
import type { ActivityResponse } from "@/features/activities/types"
import CategorySelect from "@/features/categories/components/category-select"
import type { CategoryResponse } from "@/features/categories/types"

type ActivityFormProps = {
  selectedDate: string
  onDateChange: (date: string) => void
  categories: CategoryResponse[]
  onActivityCreated: (activity: ActivityResponse) => void
  onActivityUpdated: (activity: ActivityResponse) => void
  editingActivity?: ActivityResponse | null
  onCancelEdit: () => void
}

export default function ActivityForm({
  selectedDate,
  onDateChange,
  categories,
  onActivityCreated,
  onActivityUpdated,
  editingActivity,
  onCancelEdit,
}: ActivityFormProps) {
  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState<string | undefined>()
  const [notes, setNotes] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (
      categoryId &&
      !categories.some((category) => category.id === categoryId)
    ) {
      setCategoryId(undefined)
    }
  }, [categories, categoryId])

  useEffect(() => {
    if (!editingActivity) {
      setTitle("")
      setCategoryId(undefined)
      setNotes("")
      setStatusMessage("")
      return
    }

    setTitle(editingActivity.title)
    setCategoryId(editingActivity.categoryId ?? undefined)
    setNotes(editingActivity.notes ?? "")
    setStatusMessage("")
    onDateChange(editingActivity.date.slice(0, 10))
  }, [editingActivity, onDateChange])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      setStatusMessage("Add a short title before saving.")
      return
    }

    setIsSubmitting(true)
    setStatusMessage("")

    try {
      if (editingActivity) {
        const result = await updateActivity(editingActivity.id, {
          title,
          categoryId,
          notes,
          date: selectedDate,
        })

        setStatusMessage("Activity updated.")
        onActivityUpdated(result.activity)
        return
      }

      const result = await createActivity({
        title,
        categoryId,
        notes,
        date: selectedDate,
      })

      setTitle("")
      setCategoryId(undefined)
      setNotes("")
      setStatusMessage("Activity added.")
      onActivityCreated(result.activity)
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Could not create activity."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="activity-date">Date</FieldLabel>
          <Input
            id="activity-date"
            type="date"
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
          />
          <FieldDescription>
            Clicking a day in the calendar updates this date.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="activity-title">Activity</FieldLabel>
          <Input
            id="activity-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Morning run"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="activity-category">Category</FieldLabel>
          <CategorySelect
            categories={categories}
            value={categoryId}
            onValueChange={setCategoryId}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="activity-notes">Notes</FieldLabel>
          <textarea
            id="activity-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="min-h-24 w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            placeholder="Distance, time, mood, or anything useful."
          />
        </Field>
      </FieldGroup>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting
              ? editingActivity
                ? "Saving..."
                : "Adding..."
              : editingActivity
                ? "Save changes"
                : "Add activity"}
          </Button>

          {editingActivity ? (
            <Button
              type="button"
              variant="outline"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          ) : null}
        </div>

        {statusMessage ? (
          <p className="text-sm text-muted-foreground">{statusMessage}</p>
        ) : null}
      </div>
    </form>
  )
}
