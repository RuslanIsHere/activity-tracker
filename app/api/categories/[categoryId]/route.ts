import { validateCategoryInput } from "@/features/categories/validation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type CategoryRouteContext = {
  params: Promise<{
    categoryId: string
  }>
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

export async function PATCH(request: Request, context: CategoryRouteContext) {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { categoryId } = await context.params
    const body = await request.json()
    const validationResult = validateCategoryInput(body)

    if (!validationResult.success) {
      return Response.json(
        { error: validationResult.error },
        { status: 400 }
      )
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
      select: { id: true },
    })

    if (!existingCategory) {
      return Response.json({ error: "Category not found" }, { status: 404 })
    }

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: validationResult.data.name,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    })

    return Response.json({ category })
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

export async function DELETE(_request: Request, context: CategoryRouteContext) {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { categoryId } = await context.params
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
      select: { id: true },
    })

    if (!existingCategory) {
      return Response.json({ error: "Category not found" }, { status: 404 })
    }

    await prisma.category.delete({
      where: { id: categoryId },
    })

    return Response.json({ category: { id: categoryId } })
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
