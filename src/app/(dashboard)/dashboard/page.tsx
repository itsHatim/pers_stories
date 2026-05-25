import Link from "next/link";

import { Button } from "@/components/ui/button";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Dashboard",
    intro: "Manage your drafts, previews, and finished fairy tales.",
    cta: "New story",
    stats: [["Created stories", "3"], ["Previews", "2"], ["PDFs available", "1"]],
  },
  de: {
    title: "Dashboard",
    intro: "Verwalte deine Entwürfe, Vorschauen und fertigen Märchen.",
    cta: "Neues Märchen",
    stats: [["Erstellte Märchen", "3"], ["Vorschauen", "2"], ["PDFs verfügbar", "1"]],
  },
  es: {
    title: "Panel",
    intro: "Gestiona tus borradores, vistas previas y cuentos terminados.",
    cta: "Nuevo cuento",
    stats: [["Cuentos creados", "3"], ["Vistas previas", "2"], ["PDF disponibles", "1"]],
  },
} satisfies Record<Language, { title: string; intro: string; cta: string; stats: string[][] }>;

export default async function DashboardPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          <p className="mt-2 text-muted-foreground">{t.intro}</p>
        </div>

        <Button asChild className="rounded-full">
          <Link href="/create">{t.cta}</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.stats.map(([label, value]) => (
          <div key={label} className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-3 text-4xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
