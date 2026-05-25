import Link from "next/link";
import { ArrowRight, BookOpen, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Language } from "@/lib/i18n";

const copy = {
  en: {
    badge: "Personalized fairy tales for children",
    title: "Create a fairy tale where your child is the hero",
    description:
      "Turn names, interests, and small family moments into a loving story your child will want to read again and again.",
    primary: "Create my story",
    secondary: "View examples",
    checks: ["Personal & emotional", "PDF planned", "Ideal as a gift"],
    preview: "Preview",
    storyTitle: "Leo and the Star Forest",
    storyText:
      "One evening, Leo discovered a tiny golden door behind his bookshelf. Beyond it waited a forest where every star knew his name...",
  },
  de: {
    badge: "Personalisierte Märchen für Kinder",
    title: "Erstelle ein Märchen, in dem dein Kind die Hauptrolle spielt",
    description:
      "Verwandle Namen, Interessen und kleine Familienmomente in eine liebevolle Geschichte, die dein Kind immer wieder lesen möchte.",
    primary: "Mein Märchen erstellen",
    secondary: "Beispiele ansehen",
    checks: ["Persönlich & emotional", "Als PDF geplant", "Ideal als Geschenk"],
    preview: "Vorschau",
    storyTitle: "Leo und der Sternenwald",
    storyText:
      "Eines Abends entdeckte Leo eine kleine goldene Tür hinter seinem Bücherregal. Dahinter wartete ein Wald, in dem jeder Stern seinen Namen kannte...",
  },
  es: {
    badge: "Cuentos personalizados para niños",
    title: "Crea un cuento donde tu hijo sea el protagonista",
    description:
      "Convierte nombres, intereses y pequeños momentos familiares en una historia cariñosa que tu hijo querrá leer una y otra vez.",
    primary: "Crear mi cuento",
    secondary: "Ver ejemplos",
    checks: ["Personal y emotivo", "PDF previsto", "Ideal como regalo"],
    preview: "Vista previa",
    storyTitle: "Leo y el bosque de estrellas",
    storyText:
      "Una noche, Leo descubrió una pequeña puerta dorada detrás de su estantería. Al otro lado lo esperaba un bosque donde cada estrella conocía su nombre...",
  },
} satisfies Record<Language, Record<string, string | string[]>>;

type HeroSectionProps = {
  language: Language;
};

export function HeroSection({ language }: HeroSectionProps) {
  const t = copy[language];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_35%),radial-gradient(circle_at_top_right,#bfdbfe,transparent_30%),linear-gradient(to_bottom,#fff7ed,#ffffff)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center lg:py-28">
        <div>
          <Badge className="mb-5 rounded-full px-4 py-2">{t.badge}</Badge>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            {t.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            {t.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full">
              <Link href="/create">
                {t.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full bg-white/70"
            >
              <Link href="/examples">{t.secondary}</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
            {(t.checks as string[]).map((check) => (
              <div key={check} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                {check}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-orange-200 blur-3xl" />
          <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-blue-200 blur-3xl" />

          <div className="relative rounded-[2rem] border bg-white p-5 shadow-2xl">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 p-6">
              <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{t.preview}</Badge>
                  <BookOpen className="h-5 w-5 text-orange-500" />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-slate-950">
                  {t.storyTitle}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">{t.storyText}</p>

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
