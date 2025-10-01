"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function AdminRegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const body: any = Object.fromEntries(new FormData(e.currentTarget).entries())
    body.role = "administrator"

    const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(body) })
    if (!res.ok) {
      setError(await res.text())
      setLoading(false)
      return
    }
    router.replace("/admin")
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
      <p className="mb-3 text-xs text-muted-foreground">Note: File uploads are not persisted in this preview.</p>
      <div className="grid gap-4">
        <h3 className="font-medium">Official's Personal Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div>
            <Label htmlFor="designation">Official Designation</Label>
            <Input id="designation" name="designation" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="photo">Profile Photo</Label>
            <Input id="photo" name="photo" type="file" accept=".jpg,.jpeg,.png" />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Government Body Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="department">Department/Ministry</Label>
            <Input id="department" name="department" required />
          </div>
          <div>
            <Label htmlFor="division">Agency/Division</Label>
            <Input id="division" name="division" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="officeAddress">Office Address</Label>
            <Textarea id="officeAddress" name="officeAddress" rows={2} />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Official Contact Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Official Email (prefer .gov.in)</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Official Phone</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Verification and Credentials</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="signature">Upload Digital Signature (PNG)</Label>
            <Input id="signature" name="signature" type="file" accept=".png" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="roleDesc">Role / Responsibilities</Label>
            <Textarea id="roleDesc" name="roleDesc" rows={2} />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Government ID Verification</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="govId">Government Employee ID Number</Label>
            <Input id="govId" name="govId" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="govIdUpload">Upload Official ID Card</Label>
            <Input id="govIdUpload" name="govIdUpload" type="file" accept=".png,.jpg,.jpeg,.pdf" />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Account Credentials</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="password">Create Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required />
          </div>
        </div>
      </div>
      <Button disabled={loading} type="submit" className="mt-4 bg-primary text-primary-foreground">
        {loading ? "Creating..." : "Create Administrator Account"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}
