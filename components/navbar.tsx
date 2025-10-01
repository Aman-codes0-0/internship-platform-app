"use client"

import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function Navbar() {
  const { data } = useSWR<{ authenticated: boolean; role?: string }>("/api/auth/session", fetcher)

  const authed = data?.authenticated
  const role = (data?.role || "") as "student" | "mentor" | "employer" | "administrator" | ""

  const dashPath =
    role === "student"
      ? "/student"
      : role === "mentor"
        ? "/mentor"
        : role === "employer"
          ? "/employer"
          : role === "administrator"
            ? "/admin"
            : "/"

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-primary">
          Prashikshan
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#home" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </a>
          <a href="#nep" className="text-sm text-muted-foreground hover:text-foreground">
            NEP Guidelines
          </a>
          <a href="#partners" className="text-sm text-muted-foreground hover:text-foreground">
            Industry Partners
          </a>
          <a href="#career" className="text-sm text-muted-foreground hover:text-foreground">
            Career Guidance
          </a>
          <Link href="/grievance" className="text-sm text-muted-foreground hover:text-foreground">
            Grievance
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {authed ? (
            <>
              <Link href={dashPath}>
                <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
                  Dashboard
                </Button>
              </Link>
              <form action="/api/auth/logout" method="post">
                <Button size="sm" variant="outline" className={cn("border-primary text-primary hover:bg-primary/10")}>
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <Link href="/auth">
              <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
                Login / Register
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
