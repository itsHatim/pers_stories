import {
  Gift,
  Lock,
  Sparkles,
  Download,
  Rocket,
  PawPrint,
  Cake,
  ShieldCheck,
} from "lucide-react";

import { HeroSection } from "@/components/marketing/hero-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentLanguage } from "@/lib/i18n-server";
import { type Language } from "@/lib/i18n";

const copy = {
  en: {
    howBadge: "How it works",
    howTitle: "Your personal fairy tale in three steps",
    howText:
      "The structure is ready so preview, payment, and PDF creation can be integrated cleanly later.",
    steps: [
      ["01", "Personalize the character", "Enter the child's name, age, and interests."],
      ["02", "Choose an adventure", "Select the theme, mood, and special details."],
      ["03", "Receive the story", "Review the preview and later download the finished PDF."],
    ],
    benefitsBadge: "Benefits",
    benefitsTitle: "A fairy tale that feels truly personal",
    benefitsText:
      "MiCuento helps families create special reading moments that touch children emotionally and stay with them.",
    examplesBadge: "Examples",
    examplesTitle: "Stories for little heroes",
    testimonialsBadge: "Family voices",
    testimonialsTitle: "Fictional feedback on the product idea",
    benefits: [
      ["Individually personalized", "Name, age, interests, and special details are woven into the story."],
      ["Perfect as a gift", "An emotional gift for birthdays, holidays, or special family moments."],
      ["PDF planned", "The finished fairy tale should later be downloadable as a PDF."],
      ["Safe & private", "The platform is prepared with families, children, and privacy in mind."],
    ],
    examples: [
      ["Space adventure", "A journey to friendly planets, stars, and brave discoveries."],
      ["Magical animals", "A forest full of talking animals, little puzzles, and warm encounters."],
      ["Special birthday", "A birthday where every page brings a new surprise."],
      ["Growing brave", "A story that nurtures confidence, strength, and imagination."],
    ],
    testimonials: [
      ["Laura M.", "My daughter loved being the hero of the story."],
      ["Thomas K.", "A beautiful idea for parents looking for a personal gift."],
      ["Sophie R.", "Warm, creative, and emotional. Exactly how modern children's stories should feel."],
    ],
  },
  de: {
    howBadge: "So funktioniert es",
    howTitle: "In drei Schritten zum persönlichen Märchen",
    howText:
      "Die Struktur ist vorbereitet, damit später Vorschau, Zahlung und PDF-Erstellung sauber integriert werden können.",
    steps: [
      ["01", "Figur personalisieren", "Name, Alter und Interessen des Kindes eingeben."],
      ["02", "Abenteuer wählen", "Thema, Stimmung und besondere Details auswählen."],
      ["03", "Märchen erhalten", "Vorschau prüfen und später das fertige PDF herunterladen."],
    ],
    benefitsBadge: "Vorteile",
    benefitsTitle: "Ein Märchen, das sich wirklich persönlich anfühlt",
    benefitsText:
      "MiCuento soll Familien helfen, besondere Lesemomente zu schaffen, die Kinder emotional berühren und lange in Erinnerung bleiben.",
    examplesBadge: "Beispiele",
    examplesTitle: "Geschichten für kleine Heldinnen und Helden",
    testimonialsBadge: "Stimmen von Familien",
    testimonialsTitle: "Fiktive Rückmeldungen zur Produktidee",
    benefits: [
      ["Individuell personalisiert", "Name, Alter, Interessen und besondere Details werden in die Geschichte integriert."],
      ["Perfekt als Geschenk", "Ein emotionales Geschenk für Geburtstag, Weihnachten oder besondere Familienmomente."],
      ["Als PDF geplant", "Das fertige Märchen soll später bequem als PDF heruntergeladen werden können."],
      ["Sicher & privat", "Die Plattform wird mit Fokus auf Familien, Kinder und Datenschutz vorbereitet."],
    ],
    examples: [
      ["Weltraumabenteuer", "Eine Reise zu freundlichen Planeten, Sternen und mutigen Entdeckungen."],
      ["Magische Tiere", "Ein Wald voller sprechender Tiere, kleiner Rätsel und liebevoller Begegnungen."],
      ["Besonderer Geburtstag", "Ein Geburtstag, bei dem jede Seite eine neue Überraschung bereithält."],
      ["Mut lernen", "Eine Geschichte, die Selbstvertrauen, Stärke und Fantasie fördert."],
    ],
    testimonials: [
      ["Laura M.", "Meine Tochter war begeistert, weil sie selbst die Heldin der Geschichte war."],
      ["Thomas K.", "Eine wunderschöne Idee für Eltern, die ein persönliches Geschenk suchen."],
      ["Sophie R.", "Warm, kreativ und emotional. Genau so stelle ich mir moderne Kindergeschichten vor."],
    ],
  },
  es: {
    howBadge: "Cómo funciona",
    howTitle: "Tu cuento personalizado en tres pasos",
    howText:
      "La estructura está preparada para integrar después la vista previa, el pago y la creación de PDF.",
    steps: [
      ["01", "Personaliza el personaje", "Introduce el nombre, la edad y los intereses del niño."],
      ["02", "Elige una aventura", "Selecciona el tema, el tono y los detalles especiales."],
      ["03", "Recibe el cuento", "Revisa la vista previa y descarga después el PDF terminado."],
    ],
    benefitsBadge: "Ventajas",
    benefitsTitle: "Un cuento que se siente realmente personal",
    benefitsText:
      "MiCuento ayuda a las familias a crear momentos de lectura especiales que emocionan a los niños y permanecen en el recuerdo.",
    examplesBadge: "Ejemplos",
    examplesTitle: "Historias para pequeños héroes",
    testimonialsBadge: "Opiniones de familias",
    testimonialsTitle: "Comentarios ficticios sobre la idea del producto",
    benefits: [
      ["Personalización individual", "Nombre, edad, intereses y detalles especiales se integran en el cuento."],
      ["Perfecto como regalo", "Un regalo emotivo para cumpleaños, fiestas o momentos familiares especiales."],
      ["PDF previsto", "El cuento terminado podrá descargarse cómodamente como PDF más adelante."],
      ["Seguro y privado", "La plataforma se prepara pensando en familias, niños y privacidad."],
    ],
    examples: [
      ["Aventura espacial", "Un viaje a planetas amistosos, estrellas y descubrimientos valientes."],
      ["Animales mágicos", "Un bosque lleno de animales que hablan, pequeños enigmas y encuentros tiernos."],
      ["Cumpleaños especial", "Un cumpleaños donde cada página trae una nueva sorpresa."],
      ["Aprender valentía", "Una historia que fomenta confianza, fuerza e imaginación."],
    ],
    testimonials: [
      ["Laura M.", "A mi hija le encantó ser la protagonista del cuento."],
      ["Thomas K.", "Una idea preciosa para padres que buscan un regalo personal."],
      ["Sophie R.", "Cálido, creativo y emotivo. Justo como imagino los cuentos infantiles modernos."],
    ],
  },
} satisfies Record<Language, Record<string, unknown>>;

const benefitIcons = [Sparkles, Gift, Download, Lock];
const exampleIcons = [Rocket, PawPrint, Cake, ShieldCheck];

export default async function HomePage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <>
      <HeroSection language={language} />

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">
            {t.howBadge as string}
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t.howTitle as string}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.howText as string}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {(t.steps as string[][]).map(([number, title, text]) => (
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
                {t.benefitsBadge as string}
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                {t.benefitsTitle as string}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t.benefitsText as string}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {(t.benefits as string[][]).map(([title, text], index) => {
                const Icon = benefitIcons[index];

                return (
                  <Card key={title} className="rounded-3xl bg-white">
                    <CardHeader>
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                        <Icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{text}</p>
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
            {t.examplesBadge as string}
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t.examplesTitle as string}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {(t.examples as string[][]).map(([title, text], index) => {
            const Icon = exampleIcons[index];

            return (
              <Card key={title} className="rounded-3xl transition hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{text}</p>
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
              {t.testimonialsBadge as string}
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              {t.testimonialsTitle as string}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(t.testimonials as string[][]).map(([name, text]) => (
              <Card key={name} className="rounded-3xl border-white/10 bg-white/10 text-white">
                <CardContent className="pt-6">
                  <p className="leading-7 text-white/80">“{text}”</p>
                  <p className="mt-5 font-semibold">{name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
