import { validateActivityInput } from "@/features/activities/validation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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

export async function GET() {
  try {
    const session = await auth()
    const userEmail = session?.user?.email

    if (!userEmail) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    })

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const activities = await prisma.activity.findMany({
      where: { userId: user.id },
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
    const session = await auth()
    const userEmail = session?.user?.email

    if (!userEmail) {
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

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    })

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, categoryId, notes, date } = validationResult.data

    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          userId: user.id,
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
        date: new Date(`${date}T00:00:00.000Z`),
        userId: user.id,
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
