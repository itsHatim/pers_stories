import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Verwalte deine Entwürfe, Vorschauen und fertigen Märchen.
          </p>
        </div>

        <Button asChild className="rounded-full">
          <Link href="/create">Neues Märchen</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["Erstellte Märchen", "3"],
          ["Vorschauen", "2"],
          ["PDFs verfügbar", "1"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-3 text-4xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
