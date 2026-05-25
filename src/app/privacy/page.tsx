import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Privacy Policy",
    text: "This page is a placeholder. Before publication, the privacy policy should be legally reviewed and fully completed.",
  },
  de: {
    title: "Datenschutzerklärung",
    text: "Diese Seite ist ein Platzhalter. Vor der Veröffentlichung sollte die Datenschutzerklärung rechtlich geprüft und vollständig ausgearbeitet werden.",
  },
  es: {
    title: "Política de privacidad",
    text: "Esta página es un marcador de posición. Antes de la publicación, la política de privacidad debe revisarse legalmente y completarse por completo.",
  },
} satisfies Record<Language, { title: string; text: string }>;

export default async function PrivacyPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-6 text-muted-foreground">{t.text}</p>
    </section>
  );
}
