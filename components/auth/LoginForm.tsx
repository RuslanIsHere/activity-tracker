"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginForm } from "@/features/auth/hooks/use-login-form"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  
  const { values, error, isSubmitting, handleChange, handleSubmit } =
  useLoginForm()

  return (
    <div className="w-full max-w-md rounded-3xl border bg-background p-4 shadow-lg shadow-black/5 sm:p-5">
      <div className="space-y-3.5">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Log in to your account</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to Activity Tracker.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <FieldGroup className="gap-3.5">
            <Field>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                id="form-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={values.email}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="form-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="form-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  className="pr-16"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-7 -translate-y-1/2 px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Field>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <Field orientation="horizontal">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </Field>
          </FieldGroup>
        </form>

        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-medium text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
