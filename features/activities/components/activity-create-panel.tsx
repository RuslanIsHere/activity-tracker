"use client"

import type { CSSProperties } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ActivityResponse } from "@/features/activities/types"
import CategoryManager from "@/features/categories/components/category-manager"
import type { CategoryResponse } from "@/features/categories/types"
import { useState } from "react"
import ActivityForm from "./activity-form"
import ActivityList from "./activity-list"

type ActivityCreatePanelProps = {
  selectedDate: string
  onDateChange: (date: string) => void
  activities: ActivityResponse[]
  categories: CategoryResponse[]
  panelHeight?: number
  isCreatingActivity: boolean
  editingActivity: ActivityResponse | null
  onActivityCreated: (activity: ActivityResponse) => void
  onActivityUpdated: (activity: ActivityResponse) => void
  onStartCreate: () => void
  onEditActivity: (activity: ActivityResponse) => void
  onDeleteActivity: (activity: ActivityResponse) => void
  onCancelEdit: () => void
  onCategoryCreated: (category: CategoryResponse) => void
  onCategoryUpdated: (category: CategoryResponse) => void
  onCategoryDeleted: (categoryId: string) => void
}

function formatReadableDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "full",
  }).format(new Date(`${date}T00:00:00`))
}

export default function ActivityCreatePanel({
  selectedDate,
  onDateChange,
  activities,
  categories,
  panelHeight,
  isCreatingActivity,
  editingActivity,
  onActivityCreated,
  onActivityUpdated,
  onStartCreate,
  onEditActivity,
  onDeleteActivity,
  onCancelEdit,
  onCategoryCreated,
  onCategoryUpdated,
  onCategoryDeleted,
}: ActivityCreatePanelProps) {
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  const isFormOpen = isCreatingActivity || Boolean(editingActivity)

  return (
    <aside
      className="rounded-lg border bg-card p-4 shadow-sm sm:p-5 lg:max-h-[var(--calendar-panel-height)] lg:overflow-y-auto"
      style={
        panelHeight
          ? ({
              "--calendar-panel-height": `${panelHeight}px`,
            } as CSSProperties)
          : undefined
      }
    >
      <div className="space-y-5">
        <section className="rounded-2xl border bg-muted/20 p-4">
          <p className="text-sm font-medium text-muted-foreground">
            Selected day
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            {formatReadableDate(selectedDate)}
          </h3>
          <div className="mt-4 flex items-center justify-between gap-3">
            <Badge variant="secondary">
              {activities.length} {activities.length === 1 ? "activity" : "activities"}
            </Badge>
            <Button type="button" size="sm" onClick={onStartCreate}>
              {isFormOpen ? "New activity" : "Add activity"}
            </Button>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">Activities</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                setIsCategoryManagerOpen((currentValue) => !currentValue)
              }
            >
              Manage categories
            </Button>
          </div>

          <ActivityList
            activities={activities}
            editingActivityId={editingActivity?.id ?? null}
            onEditActivity={onEditActivity}
            onDeleteActivity={onDeleteActivity}
          />

          {isCategoryManagerOpen ? (
            <CategoryManager
              categories={categories}
              onCategoryCreated={onCategoryCreated}
              onCategoryUpdated={onCategoryUpdated}
              onCategoryDeleted={onCategoryDeleted}
            />
          ) : null}
        </section>

        {isFormOpen ? (
          <section className="space-y-3 rounded-2xl border p-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                {editingActivity ? "Edit activity" : "Add activity"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {editingActivity
                  ? "Update the selected activity for this day."
                  : "Add a new activity to the selected day."}
              </p>
            </div>

            <ActivityForm
              selectedDate={selectedDate}
              onDateChange={onDateChange}
              categories={categories}
              onActivityCreated={onActivityCreated}
              onActivityUpdated={onActivityUpdated}
              editingActivity={editingActivity}
              onCancelEdit={onCancelEdit}
            />
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
            Select an activity to edit or use the button above to add a new one.
          </section>
        )}
      </div>
    </aside>
  )
}
