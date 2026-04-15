"use client"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { DateClickArg } from "@fullcalendar/interaction"

type CalendarProps = {
  selectedDate: string
  onDateSelect: (date: string) => void
}

function formatCalendarDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  function handleDateClick(info: DateClickArg) {
    onDateSelect(info.dateStr)
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
      <div className="activity-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          dateClick={handleDateClick}
          dayCellClassNames={(info) =>
            formatCalendarDate(info.date) === selectedDate
              ? ["activity-calendar-selected-day"]
              : []
          }
          buttonText={{
            today: "Today",
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
        />
      </div>
    </div>
  )
}
