import { NextResponse } from "next/server"
import { store, type Role } from "@/lib/store"
import { createSession, verifyPassword } from "@/lib/auth"

export async function POST(req: Request) {
  const body = (await req.json()) as any
  const role = (String(body.role || "") as Role) || "student"
  const email = String(body.email || "").toLowerCase()
  const password = String(body.password || "")

  const user = store.getUser(role, email)
  if (!user) return new NextResponse("User not found", { status: 404 })

  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) return new NextResponse("Invalid password", { status: 401 })

  await createSession(email, role)
  return NextResponse.json({ ok: true, role })
}
