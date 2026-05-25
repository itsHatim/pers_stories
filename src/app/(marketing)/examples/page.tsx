import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Examples",
    intro:
      "These example ideas show what kinds of personalized children's stories may be possible later.",
    text:
      "A warm, imaginative story with a personal main character, emotional message, and child-friendly language.",
    examples: [
      "Emma and the Moon Garden",
      "Leo and the Talking Foxes",
      "Mia and the Brave Rainbow",
      "Noah on the Planet of Wishes",
    ],
  },
  de: {
    title: "Beispiele",
    intro:
      "Diese Beispielideen zeigen, welche Arten von personalisierten Kindergeschichten später möglich sein können.",
    text:
      "Eine warme, fantasievolle Geschichte mit persönlicher Hauptfigur, emotionaler Botschaft und kindgerechter Sprache.",
    examples: [
      "Emma und der Mondgarten",
      "Leo und die sprechenden Füchse",
      "Mia und der mutige Regenbogen",
      "Noah auf dem Planeten der Wünsche",
    ],
  },
  es: {
    title: "Ejemplos",
    intro:
      "Estas ideas de ejemplo muestran qué tipos de cuentos infantiles personalizados podrían ser posibles más adelante.",
    text:
      "Una historia cálida e imaginativa con protagonista personal, mensaje emocional y lenguaje adecuado para niños.",
    examples: [
      "Emma y el jardín lunar",
      "Leo y los zorros parlantes",
      "Mia y el arcoíris valiente",
      "Noah en el planeta de los deseos",
    ],
  },
} satisfies Record<Language, { title: string; intro: string; text: string; examples: string[] }>;

export default async function ExamplesPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t.intro}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {t.examples.map((title) => (
          <Card key={title} className="rounded-3xl">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
