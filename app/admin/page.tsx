import { requireRole } from "@/lib/auth"

export default async function AdminDashboard() {
  const session = await requireRole("administrator")
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Administrator Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome, {session.email}. Verify organizations, monitor activity, and manage credits.
      </p>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card title="Verifications" />
        <Card title="Reports" />
        <Card title="System Settings" />
      </section>
    </main>
  )
}

function Card({ title }: { title: string }) {
  return <div className="rounded-lg border bg-card p-5">{title}</div>
}
