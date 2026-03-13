export type RegisterInput = {
  email: string
  name: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

export type AuthUser = {
  id: string
  email: string
  name: string | null
}

export type ValidationResult<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }

export type AuthErrorResponse = {
  error: string
}

export type RegisterResponse = {
  user: AuthUser
}

export type RegisterApiResponse = RegisterResponse | AuthErrorResponse

// Tip:
// Add more auth-related types here only when they belong specifically
// to the auth feature: form state, API payloads, auth user shape.
