import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Pricing",
    intro: "Simple pricing for personalized children's stories.",
    plans: [
      ["Digital fairy tale", "For a personal story as a digital version.", "9.99 €", ["Personalized story", "Preview planned", "PDF download planned"], "Create story"],
      ["Premium fairy tale", "For a longer story with a special dedication.", "19.99 €", ["Longer story", "Personal dedication", "Premium PDF design planned"], "Choose premium"],
    ],
  },
  de: {
    title: "Preise",
    intro: "Einfache Preisstruktur für personalisierte Kindergeschichten.",
    plans: [
      ["Digitales Märchen", "Für eine persönliche Geschichte als digitale Version.", "9,99 €", ["Personalisierte Geschichte", "Vorschau geplant", "PDF-Download geplant"], "Märchen erstellen"],
      ["Premium-Märchen", "Für eine längere Geschichte mit besonderer Widmung.", "19,99 €", ["Längere Geschichte", "Persönliche Widmung", "Premium-PDF-Design geplant"], "Premium wählen"],
    ],
  },
  es: {
    title: "Precios",
    intro: "Precios sencillos para cuentos infantiles personalizados.",
    plans: [
      ["Cuento digital", "Para una historia personal en versión digital.", "9,99 €", ["Cuento personalizado", "Vista previa prevista", "Descarga PDF prevista"], "Crear cuento"],
      ["Cuento premium", "Para una historia más larga con dedicatoria especial.", "19,99 €", ["Historia más larga", "Dedicatoria personal", "Diseño PDF premium previsto"], "Elegir premium"],
    ],
  },
} satisfies Record<Language, { title: string; intro: string; plans: [string, string, string, string[], string][] }>;

export default async function PricingPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {t.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {t.plans.map(([title, description, price, features, cta], index) => (
          <Card
            key={title}
            className={index === 1 ? "rounded-3xl border-orange-300 shadow-lg" : "rounded-3xl"}
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{price}</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full rounded-full">
                <Link href="/create">{cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
