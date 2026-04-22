import { validateActivityInput } from "@/features/activities/validation"
import { parseStoredActivityDate } from "@/features/activities/lib/date"
import { serializeActivity } from "@/features/activities/lib/serializers"
import { getCurrentUserId } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const activities = await prisma.activity.findMany({
      where: { userId },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        title: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        notes: true,
        date: true,
      },
    })

    return Response.json({
      activities: activities.map(serializeActivity),
    })
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validationResult = validateActivityInput(body)

    if (!validationResult.success) {
      return Response.json(
        { error: validationResult.error },
        { status: 400 }
      )
    }

    const { title, categoryId, notes, date } = validationResult.data

    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          userId,
        },
        select: { id: true },
      })

      if (!category) {
        return Response.json({ error: "Category not found" }, { status: 404 })
      }
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        categoryId,
        notes,
        date: parseStoredActivityDate(date),
        userId,
      },
      select: {
        id: true,
        title: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        notes: true,
        date: true,
      },
    })

    return Response.json(
      {
        activity: serializeActivity(activity),
      },
      { status: 201 }
    )
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
