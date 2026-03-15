"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { registerUser } from "../api"
import { validateRegisterInput } from "../validation"
import { RegisterInput } from "../types"

const initialValues: RegisterInput = {
  email: "",
  name: "",
  password: "",
}

export function useRegisterForm() {
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    const validationResult = validateRegisterInput(values)

    if (!validationResult.success) {
      setError(validationResult.error)
      return
    }

    try {
      setIsSubmitting(true)

      await registerUser(validationResult.data)
      setValues(initialValues)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    error,
    isSubmitting,
    handleChange,
    handleSubmit,
  }
}
