import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Terms and Conditions",
    text: "This page is a placeholder. The final terms should be legally reviewed before the platform launches.",
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen",
    text: "Diese Seite ist ein Platzhalter. Die finalen AGB sollten vor dem Start der Plattform rechtlich geprüft werden.",
  },
  es: {
    title: "Términos y condiciones",
    text: "Esta página es un marcador de posición. Los términos finales deben revisarse legalmente antes del lanzamiento de la plataforma.",
  },
} satisfies Record<Language, { title: string; text: string }>;

export default async function TermsPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-6 text-muted-foreground">{t.text}</p>
    </section>
  );
}
