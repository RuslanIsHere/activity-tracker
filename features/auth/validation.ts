import type { RegisterInput, ValidationResult } from "./types"

export function isValidEmail(email: string): boolean {
  const normalizedEmail = email.trim().toLowerCase()

  return normalizedEmail.includes("@")
}

export function getPasswordChecks(password: string) {
  const hasMinLength = password.length >= 8
  const hasLetter = /[A-Za-z]/.test(password)
  const hasNumber = /\d/.test(password)

  return {
    hasMinLength,
    hasLetter,
    hasNumber,
  }
}

export function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

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

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, error: "Email must contain @" }
  }

  const passwordChecks = getPasswordChecks(normalizedPassword)

  if (!passwordChecks.hasMinLength) {
    return { success: false, error: "Password must be at least 8 characters long" }
  }

  if (!passwordChecks.hasLetter || !passwordChecks.hasNumber) {
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
