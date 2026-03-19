"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

const initialValues = {
  email: "",
  password: "",
}

export function useLoginForm() {
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false) 
  const router = useRouter()


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues((prevValues) => ({        
      ...prevValues,  
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!values.email.trim()) {
      setError("Email is required")
      return
    }
    if (!values.email.includes("@")) {
      setError("Please enter a valid email")
      return
    }
    if (!values.password) {
      setError("Password is required")
      return
    }

    try {
      setIsSubmitting(true)
      
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (!result || result.error) {
        setError(result?.error || "Invalid email or password")
        return
      }
      if (result.ok) {  
        router.push("/")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed")
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
