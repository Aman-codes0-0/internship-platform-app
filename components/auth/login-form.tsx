"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as any
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role,
      }),
    })
    if (!res.ok) {
      const msg = await res.text()
      setError(msg || "Login failed")
      setLoading(false)
      return
    }
    const { role } = await res.json()
    router.replace(
      role === "student" ? "/student" : role === "mentor" ? "/mentor" : role === "employer" ? "/employer" : "/admin",
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="role">Role</Label>
          <select id="role" name="role" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
            <option value="employer">Employer</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
      </div>
      <Button disabled={loading} type="submit" className="mt-4 bg-primary text-primary-foreground">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
