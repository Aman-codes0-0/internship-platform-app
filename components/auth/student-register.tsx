"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function StudentRegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)

    // Convert multi-value to strings
    const body: any = Object.fromEntries(fd.entries())
    body.role = "student"

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const msg = await res.text()
      setError(msg || "Registration failed")
      setLoading(false)
      return
    }
    router.replace("/student")
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-card p-5">
      <p className="mb-3 text-xs text-muted-foreground">Note: File uploads are not persisted in this preview.</p>
      <div className="grid gap-4">
        <h3 className="mt-2 font-medium">Personal Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" name="dob" type="date" required />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select id="gender" name="gender" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input id="profilePicture" name="profilePicture" type="file" accept=".jpg,.jpeg,.png" />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Contact Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="currentAddress">Current Address</Label>
            <Textarea id="currentAddress" name="currentAddress" rows={2} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            <Textarea id="permanentAddress" name="permanentAddress" rows={2} />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Academic Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="institution">Institution Name</Label>
            <Input id="institution" name="institution" placeholder="Your College" />
          </div>
          <div>
            <Label htmlFor="studentId">Student ID / Roll No</Label>
            <Input id="studentId" name="studentId" />
          </div>
          <div>
            <Label htmlFor="degree">Degree Program</Label>
            <select id="degree" name="degree" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>B.Sc</option>
              <option>MBA</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="major">Major / Specialization</Label>
            <Input id="major" name="major" />
          </div>
          <div>
            <Label htmlFor="year">Current Year of Study</Label>
            <select id="year" name="year" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
            </select>
          </div>
          <div>
            <Label htmlFor="gradDate">Expected Graduation Date</Label>
            <Input id="gradDate" name="gradDate" type="month" />
          </div>
          <div>
            <Label htmlFor="cgpa">Current CGPA or %</Label>
            <Input id="cgpa" name="cgpa" type="number" step="0.01" />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Skills & Documents</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="resume">Resume / CV (PDF/DOCX)</Label>
            <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="skills">Key Skills (comma-separated)</Label>
            <Input id="skills" name="skills" placeholder="Java, Python, Digital Marketing" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="portfolio">Portfolio / GitHub / LinkedIn (Optional)</Label>
            <Input id="portfolio" name="portfolio" type="url" />
          </div>
        </div>

        <h3 className="mt-4 font-medium">Government ID Verification</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="idType">Type of ID</Label>
            <select id="idType" name="idType" className="mt-1 w-full rounded-md border bg-background p-2 text-sm">
              <option>Aadhaar Card</option>
              <option>Passport</option>
              <option>Voter ID</option>
              <option>Driver's License</option>
            </select>
          </div>
          <div>
            <Label htmlFor="idNumber">Government ID Number</Label>
            <Input id="idNumber" name="idNumber" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="idUpload">Upload ID (image/PDF)</Label>
            <Input id="idUpload" name="idUpload" type="file" accept=".png,.jpg,.jpeg,.pdf" />
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
        {loading ? "Creating..." : "Create Student Account"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}
