import { validateRegisterInput } from "@/features/auth/validation"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = validateRegisterInput(body);

    if (!validationResult.success) {
      return Response.json({ error: validationResult.error }, { status: 400 });
    }

    const { email, name, password } = validationResult.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingUser) {
      return Response.json(
        { error: "User with this email already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return Response.json({ user }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
