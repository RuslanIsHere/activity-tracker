"use client"

import Link from "next/link"

import { useRegisterForm } from "@/features/auth/hooks/use-register-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function RegisterForm() {
  const { values, error, isSubmitting, handleChange, handleSubmit } =
    useRegisterForm()

  return (
    <div className="w-full max-w-md rounded-3xl border bg-background p-6 shadow-xl shadow-black/5 sm:p-8">
      <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Start tracking your activities with a new account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <FieldGroup>
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
              required
            />
            <FieldDescription>We&apos;ll use this email to sign you in.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="form-password">Password</FieldLabel>
            <Input
              id="form-password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              value={values.password}
              onChange={handleChange}
              required
            />
            <FieldDescription>
              Use at least one letter and one number.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="form-confirm-password">Confirm password</FieldLabel>
            <Input
              id="form-confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={values.confirmPassword}
              onChange={handleChange}
              required
            />
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
