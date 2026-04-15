"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CategoryResponse } from "@/features/categories/types"

type CategorySelectProps = {
  categories: CategoryResponse[]
  value?: string
  onValueChange: (categoryId?: string) => void
}

const NO_CATEGORY_VALUE = "none"

export default function CategorySelect({
  categories,
  value,
  onValueChange,
}: CategorySelectProps) {
  return (
    <Select
      value={value ?? NO_CATEGORY_VALUE}
      onValueChange={(nextValue) =>
        onValueChange(
          nextValue === NO_CATEGORY_VALUE ? undefined : nextValue
        )
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="No category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NO_CATEGORY_VALUE}>No category</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
