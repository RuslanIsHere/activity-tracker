export type ActivityFormInput = {
  title: string
  categoryId?: string
  notes?: string
  date: string
}

export type ActivityCategory = {
  id: string
  name: string
  color: string | null
}

export type ActivityResponse = {
  id: string
  title: string
  category: ActivityCategory | null
  categoryId: string | null
  notes: string | null
  date: string
}
