import Link from "next/link";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Preise</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Einfache Preisstruktur für personalisierte Kindergeschichten.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Digitales Märchen</CardTitle>
            <p className="text-sm text-muted-foreground">
              Für eine persönliche Geschichte als digitale Version.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">9,99 €</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Personalisierte Geschichte
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Vorschau geplant
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-600" />
                PDF-Download geplant
              </li>
            </ul>
            <Button asChild className="mt-8 w-full rounded-full">
              <Link href="/create">Märchen erstellen</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-orange-300 shadow-lg">
          <CardHeader>
            <CardTitle>Premium-Märchen</CardTitle>
            <p className="text-sm text-muted-foreground">
              Für eine längere Geschichte mit besonderer Widmung.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">19,99 €</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Längere Geschichte
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Persönliche Widmung
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Premium-PDF-Design geplant
              </li>
            </ul>
            <Button asChild className="mt-8 w-full rounded-full">
              <Link href="/create">Premium wählen</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
