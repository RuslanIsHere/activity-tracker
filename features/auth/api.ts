import type { AuthUser, RegisterInput } from "./types"

export async function registerUser(data: RegisterInput): Promise<AuthUser> {
  void data

  // TODO:
  // 1. Send POST request to /api/auth/register
  // 2. Parse JSON response
  // 3. Throw Error if response is not ok
  // 4. Return created user

  throw new Error("Not implemented")
}
