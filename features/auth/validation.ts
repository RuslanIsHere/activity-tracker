import type { RegisterInput, ValidationResult } from "./types"

export function validateRegisterInput(input: unknown): ValidationResult<RegisterInput> {
  if (typeof input !== "object" || input === null) {
    return { success: false, error: "Input must be an object" }
  }

  const { email, name, password } = input as Record<string, unknown>

  if (typeof email !== "string" || typeof name !== "string" || typeof password !== "string") {
    return { success: false, error: "Email, name and password must be strings" }
  }

  const normalizedEmail = email.trim().toLowerCase()
  const normalizedName = name.trim()
  const normalizedPassword = password

  const requiredFields = [
    { value: normalizedEmail, error: "Email cannot be empty" },
    { value: normalizedName, error: "Name cannot be empty" },
    { value: normalizedPassword, error: "Password cannot be empty" },
  ]

  for (const field of requiredFields) {
    if (!field.value) {
      return { success: false, error: field.error }
    }
  }

  if (!normalizedEmail.includes("@")) {
    return { success: false, error: "Email must contain @" }
  }

  if (normalizedPassword.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long" }
  }

  const hasLetter = /[A-Za-z]/.test(normalizedPassword)
  const hasNumber = /\d/.test(normalizedPassword)

  if (!hasLetter || !hasNumber) {
    return {
      success: false,
      error: "Password must contain at least one letter and one number",
    }
  }

  return {
    success: true,
    data: {
      email: normalizedEmail,
      name: normalizedName,
      password: normalizedPassword,
    },
  }
}
