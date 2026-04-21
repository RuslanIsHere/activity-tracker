import { validateActivityInput } from "@/features/activities/validation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type ActivityRouteContext = {
  params: Promise<{
    activityId: string
  }>
}

function serializeActivity(activity: {
  id: string
  title: string
  categoryId: string | null
  category: { id: string; name: string; color: string | null } | null
  notes: string | null
  date: Date
}) {
  return {
    ...activity,
    date: activity.date.toISOString(),
  }
}

async function getCurrentUserId() {
  const session = await auth()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  })

  return user?.id ?? null
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
        date: new Date(`${date}T00:00:00.000Z`),
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
