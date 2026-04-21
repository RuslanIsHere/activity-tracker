"use client"

import type { CSSProperties } from "react"
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
  editingActivity: ActivityResponse | null
  onActivityCreated: (activity: ActivityResponse) => void
  onActivityUpdated: (activity: ActivityResponse) => void
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
  editingActivity,
  onActivityCreated,
  onActivityUpdated,
  onEditActivity,
  onDeleteActivity,
  onCancelEdit,
  onCategoryCreated,
  onCategoryUpdated,
  onCategoryDeleted,
}: ActivityCreatePanelProps) {
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)

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
      <div className="mb-5 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          Selected day
        </p>
        <h3 className="text-lg font-semibold tracking-tight">
          {formatReadableDate(selectedDate)}
        </h3>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h4 className="text-sm font-semibold">Activities</h4>
          <div>
            <ActivityList
              activities={activities}
              editingActivityId={editingActivity?.id ?? null}
              onEditActivity={onEditActivity}
              onDeleteActivity={onDeleteActivity}
            />
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">
              {editingActivity ? "Edit activity" : "Add activity"}
            </h4>
            <div className="flex items-center gap-2">
              {editingActivity ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onCancelEdit}
                >
                  Add new
                </Button>
              ) : null}
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
          </div>

          {isCategoryManagerOpen ? (
            <CategoryManager
              categories={categories}
              onCategoryCreated={onCategoryCreated}
              onCategoryUpdated={onCategoryUpdated}
              onCategoryDeleted={onCategoryDeleted}
            />
          ) : null}

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
      </div>
    </aside>
  )
}
