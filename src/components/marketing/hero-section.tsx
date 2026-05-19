import Link from "next/link";
import { ArrowRight, BookOpen, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_35%),radial-gradient(circle_at_top_right,#bfdbfe,transparent_30%),linear-gradient(to_bottom,#fff7ed,#ffffff)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center lg:py-28">
        <div>
          <Badge className="mb-5 rounded-full px-4 py-2">
            Personalisierte Märchen für Kinder
          </Badge>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Erstelle ein Märchen, in dem dein Kind die Hauptrolle spielt
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Verwandle Namen, Interessen und kleine Familienmomente in eine
            liebevolle Geschichte, die dein Kind immer wieder lesen möchte.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full">
              <Link href="/create">
                Mein Märchen erstellen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full bg-white/70"
            >
              <Link href="/examples">Beispiele ansehen</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              Persönlich & emotional
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              Als PDF geplant
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              Ideal als Geschenk
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-orange-200 blur-3xl" />
          <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-blue-200 blur-3xl" />

          <div className="relative rounded-[2rem] border bg-white p-5 shadow-2xl">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 p-6">
              <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Vorschau</Badge>
                  <BookOpen className="h-5 w-5 text-orange-500" />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-slate-950">
                  Leo und der Sternenwald
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Eines Abends entdeckte Leo eine kleine goldene Tür hinter
                  seinem Bücherregal. Dahinter wartete ein Wald, in dem jeder
                  Stern seinen Namen kannte...
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-2xl bg-orange-200" />
                  <div className="h-20 rounded-2xl bg-pink-200" />
                  <div className="h-20 rounded-2xl bg-blue-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
