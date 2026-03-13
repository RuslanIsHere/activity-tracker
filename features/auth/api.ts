import type { AuthUser, RegisterInput, RegisterResponse } from "./types"

export async function registerUser(data: RegisterInput): Promise<AuthUser> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result: RegisterResponse | { error: string } = await response.json()

  if ("error" in result) {
    throw new Error(result.error)
  }

  return result.user
}
