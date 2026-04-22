import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getCurrentUserId() {
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

