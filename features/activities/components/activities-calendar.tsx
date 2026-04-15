"use client"

import { useEffect, useMemo, useState } from "react"

import { getActivities } from "@/features/activities/api"
import type { ActivityResponse } from "@/features/activities/types"
import { getCategories } from "@/features/categories/api"
import type { CategoryResponse } from "@/features/categories/types"
import ActivityCreatePanel from "./activity-create-panel"
import Calendar from "./calendar"

function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export default function ActivitiesCalendar() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate)
  const [activities, setActivities] = useState<ActivityResponse[]>([])
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [loadMessage, setLoadMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadCalendarData() {
      try {
        const [activitiesResult, categoriesResult] = await Promise.all([
          getActivities(),
          getCategories(),
        ])

        if (!isMounted) {
          return
        }

        setActivities(activitiesResult.activities)
        setCategories(categoriesResult.categories)
        setLoadMessage("")
      } catch (error) {
        if (!isMounted) {
          return
        }

        setLoadMessage(
          error instanceof Error ? error.message : "Could not load calendar data."
        )
      }
    }

    loadCalendarData()

    return () => {
      isMounted = false
    }
  }, [])

  const selectedDayActivities = useMemo(
    () =>
      activities.filter((activity) => activity.date.slice(0, 10) === selectedDate),
    [activities, selectedDate]
  )

  function handleActivityCreated(activity: ActivityResponse) {
    setActivities((currentActivities) => [...currentActivities, activity])
  }

  function handleCategoryCreated(category: CategoryResponse) {
    setCategories((currentCategories) =>
      [...currentCategories, category].sort((firstCategory, secondCategory) =>
        firstCategory.name.localeCompare(secondCategory.name)
      )
    )
  }

  function handleCategoryUpdated(category: CategoryResponse) {
    setCategories((currentCategories) =>
      currentCategories
        .map((currentCategory) =>
          currentCategory.id === category.id ? category : currentCategory
        )
        .sort((firstCategory, secondCategory) =>
          firstCategory.name.localeCompare(secondCategory.name)
        )
    )
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.categoryId === category.id
          ? { ...activity, category }
          : activity
      )
    )
  }

  function handleCategoryDeleted(categoryId: string) {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== categoryId)
    )
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.categoryId === categoryId
          ? { ...activity, categoryId: null, category: null }
          : activity
      )
    )
  }

  return (
    <div className="space-y-3">
      {loadMessage ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {loadMessage}
        </p>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        <ActivityCreatePanel
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          activities={selectedDayActivities}
          categories={categories}
          onActivityCreated={handleActivityCreated}
          onCategoryCreated={handleCategoryCreated}
          onCategoryUpdated={handleCategoryUpdated}
          onCategoryDeleted={handleCategoryDeleted}
        />
      </div>
    </div>
  )
}
