import { validateCategoryInput } from "@/features/categories/validation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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

export async function GET() {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        color: true,
      },
    })

    return Response.json({ categories })
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
    const validationResult = validateCategoryInput(body)

    if (!validationResult.success) {
      return Response.json(
        { error: validationResult.error },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name: validationResult.data.name,
        userId,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    })

    return Response.json({ category }, { status: 201 })
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return Response.json(
        { error: "Category with this name already exists" },
        { status: 409 }
      )
    }

    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
