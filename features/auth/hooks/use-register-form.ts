"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { ChangeEvent, FormEvent } from "react"
import { registerUser } from "../api"
import { doPasswordsMatch,
  getPasswordChecks,
  isValidEmail,
  validateRegisterInput } from "../validation"
import type { RegisterInput } from "../types"

type RegisterFormValues = RegisterInput & {
  confirmPassword: string
}

const initialValues: RegisterFormValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
}

export function useRegisterForm() {
  const router = useRouter()
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEmailValid = isValidEmail(values.email)
  const passwordChecks = getPasswordChecks(values.password)
  const isPasswordConfirmed = doPasswordsMatch(values.password, values.confirmPassword)

  const validationState = {
    isEmailValid,
    passwordChecks,
    isPasswordConfirmed,
    showEmailStatus: values.email.trim() !== "",
    showPasswordStatus: values.password !== "",
    showConfirmPasswordStatus: values.confirmPassword !== "",
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!isPasswordConfirmed) {
      setError("Passwords do not match")
      return
    }

    const registerData: RegisterInput = {
      email: values.email,
      name: values.name,
      password: values.password,
    }

    const validationResult = validateRegisterInput(registerData)

    if (!validationResult.success) {
      setError(validationResult.error)
      return
    }

    try {
      setIsSubmitting(true)

      await registerUser(validationResult.data)
      setValues(initialValues)
      setSuccessMessage("Account created successfully. Redirecting to login...")
      setTimeout(() => {
        router.push("/login")
      }, 1200)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    error,
    successMessage,
    isSubmitting,
    handleChange,
    handleSubmit,
    validationState,
  }
}
