"use client"

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
  onActivityCreated: (activity: ActivityResponse) => void
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
  onActivityCreated,
  onCategoryCreated,
  onCategoryUpdated,
  onCategoryDeleted,
}: ActivityCreatePanelProps) {
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)

  return (
    <aside className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
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
          <ActivityList activities={activities} />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">Add activity</h4>
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
          />
        </section>
      </div>
    </aside>
  )
}
