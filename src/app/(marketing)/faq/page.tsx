import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "Für welches Alter ist MiCuento gedacht?",
    answer:
      "Die Plattform ist vor allem für Kinder zwischen 3 und 9 Jahren gedacht. Später kann die Geschichte altersgerecht angepasst werden.",
  },
  {
    question: "Wird die Geschichte automatisch erstellt?",
    answer:
      "Aktuell wird nur die Struktur vorbereitet. Die eigentliche Generierung mit KI wird später integriert.",
  },
  {
    question: "Kann ich das Märchen als PDF herunterladen?",
    answer:
      "Ja, der PDF-Download ist als Funktion geplant, wird aber in dieser ersten Struktur noch nicht umgesetzt.",
  },
  {
    question: "Sind Zahlungen bereits integriert?",
    answer:
      "Nein. Stripe oder andere Zahlungsanbieter werden später angebunden.",
  },
];

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Häufige Fragen</h1>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.question} className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
