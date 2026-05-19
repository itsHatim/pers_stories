import { Gift, Lock, Sparkles, Download, Rocket, PawPrint, Cake, ShieldCheck } from "lucide-react";

import { HeroSection } from "@/components/marketing/hero-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: Sparkles,
    title: "Individuell personalisiert",
    text: "Name, Alter, Interessen und besondere Details werden in die Geschichte integriert.",
  },
  {
    icon: Gift,
    title: "Perfekt als Geschenk",
    text: "Ein emotionales Geschenk für Geburtstag, Weihnachten oder besondere Familienmomente.",
  },
  {
    icon: Download,
    title: "Als PDF geplant",
    text: "Das fertige Märchen soll später bequem als PDF heruntergeladen werden können.",
  },
  {
    icon: Lock,
    title: "Sicher & privat",
    text: "Die Plattform wird mit Fokus auf Familien, Kinder und Datenschutz vorbereitet.",
  },
];

const examples = [
  {
    icon: Rocket,
    title: "Weltraumabenteuer",
    text: "Eine Reise zu freundlichen Planeten, Sternen und mutigen Entdeckungen.",
  },
  {
    icon: PawPrint,
    title: "Magische Tiere",
    text: "Ein Wald voller sprechender Tiere, kleiner Rätsel und liebevoller Begegnungen.",
  },
  {
    icon: Cake,
    title: "Besonderer Geburtstag",
    text: "Ein Geburtstag, bei dem jede Seite eine neue Überraschung bereithält.",
  },
  {
    icon: ShieldCheck,
    title: "Mut lernen",
    text: "Eine Geschichte, die Selbstvertrauen, Stärke und Fantasie fördert.",
  },
];

const testimonials = [
  {
    name: "Laura M.",
    text: "Meine Tochter war begeistert, weil sie selbst die Heldin der Geschichte war.",
  },
  {
    name: "Thomas K.",
    text: "Eine wunderschöne Idee für Eltern, die ein persönliches Geschenk suchen.",
  },
  {
    name: "Sophie R.",
    text: "Warm, kreativ und emotional. Genau so stelle ich mir moderne Kindergeschichten vor.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">
            So funktioniert es
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            In drei Schritten zum persönlichen Märchen
          </h2>
          <p className="mt-4 text-muted-foreground">
            Die Struktur ist vorbereitet, damit später Vorschau, Zahlung und
            PDF-Erstellung sauber integriert werden können.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["01", "Figur personalisieren", "Name, Alter und Interessen des Kindes eingeben."],
            ["02", "Abenteuer wählen", "Thema, Stimmung und besondere Details auswählen."],
            ["03", "Märchen erhalten", "Vorschau prüfen und später das fertige PDF herunterladen."],
          ].map(([number, title, text]) => (
            <Card key={number} className="rounded-3xl">
              <CardHeader>
                <span className="text-sm font-bold text-orange-500">{number}</span>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-orange-50/70 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Badge variant="outline" className="rounded-full bg-white">
                Vorteile
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Ein Märchen, das sich wirklich persönlich anfühlt
              </h2>
              <p className="mt-4 text-muted-foreground">
                MiCuento soll Familien helfen, besondere Lesemomente zu schaffen,
                die Kinder emotional berühren und lange in Erinnerung bleiben.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <Card key={benefit.title} className="rounded-3xl bg-white">
                    <CardHeader>
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                        <Icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{benefit.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">
            Beispiele
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Geschichten für kleine Heldinnen und Helden
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {examples.map((example) => {
            const Icon = example.icon;

            return (
              <Card key={example.title} className="rounded-3xl transition hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{example.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="rounded-full bg-white text-slate-950 hover:bg-white">
              Stimmen von Familien
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Fiktive Rückmeldungen zur Produktidee
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="rounded-3xl border-white/10 bg-white/10 text-white">
                <CardContent className="pt-6">
                  <p className="leading-7 text-white/80">“{testimonial.text}”</p>
                  <p className="mt-5 font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
