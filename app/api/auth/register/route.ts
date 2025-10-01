import { NextResponse } from "next/server"
import { store, type Role } from "@/lib/store"
import { createSession, hashPassword } from "@/lib/auth"

export async function POST(req: Request) {
  const body = (await req.json()) as any
  const role = (String(body.role || "") as Role) || "student"
  const email = String(body.email || "").toLowerCase()
  const password = String(body.password || "")
  const confirm = String(body.confirmPassword || "")

  if (!email || !password) return new NextResponse("Missing credentials", { status: 400 })
  if (password !== confirm) return new NextResponse("Passwords do not match", { status: 400 })

  try {
    const passwordHash = await hashPassword(password)
    store.createUser({ email, passwordHash, role, profile: body })
    await createSession(email, role)
    return NextResponse.json({ ok: true, role })
  } catch (e: any) {
    return new NextResponse(e?.message || "Registration error", { status: 400 })
  }
}
