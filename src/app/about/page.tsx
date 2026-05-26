import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    badge: "About us",
    title: "We make children the heroes of their own stories",
    intro:
      "MiCuento is being built for families who want warm, personal reading moments. We combine thoughtful personalization with child-friendly storytelling.",
    valuesTitle: "Our values",
    values: [
      ["Personal", "Every story should feel made for one child, not for everyone."],
      ["Gentle", "Stories stay age-appropriate, hopeful, and emotionally safe."],
      ["Private", "Family details deserve care, restraint, and clear boundaries."],
    ],
    storyTitle: "What we are building",
    story:
      "The first version focuses on creating a fictional preview from a few family details. Over time, MiCuento can grow into full stories, illustrated pages, downloadable PDFs, and keepsake books.",
  },
  de: {
    badge: "Über uns",
    title: "Wir machen Kinder zu Heldinnen und Helden ihrer eigenen Geschichten",
    intro:
      "MiCuento entsteht für Familien, die warme, persönliche Lesemomente schaffen möchten. Wir verbinden durchdachte Personalisierung mit kindgerechtem Erzählen.",
    valuesTitle: "Unsere Werte",
    values: [
      ["Persönlich", "Jede Geschichte soll sich anfühlen, als wäre sie für genau ein Kind gemacht."],
      ["Behutsam", "Geschichten bleiben altersgerecht, hoffnungsvoll und emotional sicher."],
      ["Privat", "Familiendetails verdienen Sorgfalt, Zurückhaltung und klare Grenzen."],
    ],
    storyTitle: "Was wir aufbauen",
    story:
      "Die erste Version konzentriert sich darauf, aus wenigen Familiendetails eine fiktive Vorschau zu erstellen. Später kann MiCuento zu vollständigen Geschichten, illustrierten Seiten, PDF-Downloads und Erinnerungsbüchern wachsen.",
  },
  es: {
    badge: "Sobre nosotros",
    title: "Convertimos a los niños en protagonistas de sus propios cuentos",
    intro:
      "MiCuento se está creando para familias que quieren momentos de lectura cálidos y personales. Combinamos personalización cuidadosa con narración adecuada para niños.",
    valuesTitle: "Nuestros valores",
    values: [
      ["Personal", "Cada cuento debe sentirse creado para un niño concreto, no para cualquiera."],
      ["Cuidadoso", "Las historias son apropiadas para la edad, esperanzadoras y emocionalmente seguras."],
      ["Privado", "Los detalles familiares merecen cuidado, moderación y límites claros."],
    ],
    storyTitle: "Lo que estamos construyendo",
    story:
      "La primera versión se centra en crear una vista previa ficticia a partir de algunos detalles familiares. Con el tiempo, MiCuento puede crecer hacia cuentos completos, páginas ilustradas, descargas PDF y libros de recuerdo.",
  },
} satisfies Record<
  Language,
  {
    badge: string;
    title: string;
    intro: string;
    valuesTitle: string;
    values: [string, string][];
    storyTitle: string;
    story: string;
  }
>;

export default async function AboutPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Badge className="rounded-full px-4 py-2">{t.badge}</Badge>
      <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        {t.intro}
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {t.values.map(([title, text]) => (
          <Card key={title} className="rounded-3xl bg-white">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border bg-orange-50/70 p-8">
        <h2 className="text-2xl font-bold">{t.storyTitle}</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
          {t.story}
        </p>
      </div>
    </section>
  );
}
