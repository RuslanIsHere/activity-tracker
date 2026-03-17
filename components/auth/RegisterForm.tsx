"use client"

import { useState } from "react"
import Link from "next/link"

import { useRegisterForm } from "@/features/auth/hooks/use-register-form"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { values, error, isSubmitting, handleChange, handleSubmit, validationState } =
    useRegisterForm()

  const isPasswordValid =
    validationState.passwordChecks.hasMinLength &&
    validationState.passwordChecks.hasLetter &&
    validationState.passwordChecks.hasNumber

  return (
    <div className="w-full max-w-md rounded-3xl border bg-background p-4 shadow-lg shadow-black/5 sm:p-5">
      <div className="space-y-3.5">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
          <p className="text-sm text-muted-foreground">
            Start tracking your activities with a new account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <FieldGroup className="gap-3.5">
            <Field>
              <FieldLabel htmlFor="form-name">Name</FieldLabel>
              <Input
                id="form-name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={values.name}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                id="form-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={values.email}
                onChange={handleChange}
                className={cn(
                  validationState.showEmailStatus &&
                    (validationState.isEmailValid
                      ? "border-green-500/70 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                      : "border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20")
                )}
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
                  placeholder="At least 8 characters"
                  value={values.password}
                  onChange={handleChange}
                  className={cn(
                    "pr-16",
                    validationState.showPasswordStatus &&
                      isPasswordValid &&
                      "border-green-500/70 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                  )}
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
              <FieldDescription>Use at least one letter and one number.</FieldDescription>
              {!isPasswordValid && validationState.showPasswordStatus ? (
                <div className="space-y-1 pt-0.5 text-sm">
                  <p
                    className={
                      validationState.passwordChecks.hasMinLength
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    8+ characters
                  </p>
                  <p
                    className={
                      validationState.passwordChecks.hasLetter
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    Contains a letter
                  </p>
                  <p
                    className={
                      validationState.passwordChecks.hasNumber
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    Contains a number
                  </p>
                </div>
              ) : null}
            </Field>

            <Field>
              <FieldLabel htmlFor="form-confirm-password">Confirm password</FieldLabel>
              <div className="relative">
                <Input
                  id="form-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={cn(
                    "pr-16",
                    validationState.showConfirmPasswordStatus &&
                      (validationState.isPasswordConfirmed
                        ? "border-green-500/70 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                        : "border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20")
                  )}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-7 -translate-y-1/2 px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Field>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <Field orientation="horizontal">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </Field>
          </FieldGroup>
        </form>

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
