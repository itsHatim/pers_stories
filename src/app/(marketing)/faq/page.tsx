import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Frequently Asked Questions",
    faqs: [
      ["What age is MiCuento for?", "The platform is mainly intended for children between 3 and 9. Later, stories can be adapted by age."],
      ["Is the story created automatically?", "Right now only the structure is prepared. AI generation will be integrated later."],
      ["Can I download the fairy tale as a PDF?", "Yes, PDF download is planned, but it is not implemented in this first structure yet."],
      ["Are payments already integrated?", "No. Stripe or other payment providers will be connected later."],
    ],
  },
  de: {
    title: "Häufige Fragen",
    faqs: [
      ["Für welches Alter ist MiCuento gedacht?", "Die Plattform ist vor allem für Kinder zwischen 3 und 9 Jahren gedacht. Später kann die Geschichte altersgerecht angepasst werden."],
      ["Wird die Geschichte automatisch erstellt?", "Aktuell wird nur die Struktur vorbereitet. Die eigentliche Generierung mit KI wird später integriert."],
      ["Kann ich das Märchen als PDF herunterladen?", "Ja, der PDF-Download ist als Funktion geplant, wird aber in dieser ersten Struktur noch nicht umgesetzt."],
      ["Sind Zahlungen bereits integriert?", "Nein. Stripe oder andere Zahlungsanbieter werden später angebunden."],
    ],
  },
  es: {
    title: "Preguntas frecuentes",
    faqs: [
      ["¿Para qué edad está pensado MiCuento?", "La plataforma está pensada principalmente para niños de entre 3 y 9 años. Más adelante, la historia podrá adaptarse según la edad."],
      ["¿La historia se crea automáticamente?", "Actualmente solo está preparada la estructura. La generación real con IA se integrará más adelante."],
      ["¿Puedo descargar el cuento como PDF?", "Sí, la descarga en PDF está prevista, pero todavía no está implementada en esta primera estructura."],
      ["¿Los pagos ya están integrados?", "No. Stripe u otros proveedores de pago se conectarán más adelante."],
    ],
  },
} satisfies Record<Language, { title: string; faqs: [string, string][] }>;

export default async function FAQPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>

      <div className="mt-8 space-y-4">
        {t.faqs.map(([question, answer]) => (
          <Card key={question} className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">{question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
