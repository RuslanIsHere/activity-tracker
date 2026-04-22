import { validateActivityInput } from "@/features/activities/validation"
import { parseStoredActivityDate } from "@/features/activities/lib/date"
import { serializeActivity } from "@/features/activities/lib/serializers"
import { getCurrentUserId } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"

type ActivityRouteContext = {
  params: Promise<{
    activityId: string
  }>
}

export async function PATCH(request: Request, context: ActivityRouteContext) {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId } = await context.params
    const body = await request.json()
    const validationResult = validateActivityInput(body)

    if (!validationResult.success) {
      return Response.json(
        { error: validationResult.error },
        { status: 400 }
      )
    }

    const existingActivity = await prisma.activity.findFirst({
      where: {
        id: activityId,
        userId,
      },
      select: { id: true },
    })

    if (!existingActivity) {
      return Response.json({ error: "Activity not found" }, { status: 404 })
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

    const activity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        title,
        categoryId: categoryId ?? null,
        notes,
        date: parseStoredActivityDate(date),
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

    return Response.json({
      activity: serializeActivity(activity),
    })
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: ActivityRouteContext) {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId } = await context.params
    const existingActivity = await prisma.activity.findFirst({
      where: {
        id: activityId,
        userId,
      },
      select: { id: true },
    })

    if (!existingActivity) {
      return Response.json({ error: "Activity not found" }, { status: 404 })
    }

    await prisma.activity.delete({
      where: { id: activityId },
    })

    return Response.json({ activity: { id: activityId } })
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
