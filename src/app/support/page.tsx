import Link from "next/link";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Support",
    intro:
      "Questions about a story, privacy, or your account? We are preparing simple ways for families to get help.",
    cards: [
      ["Contact", "Reach us for questions about stories, orders, and accounts."],
      ["Story help", "Get help choosing a theme, dedication, or age-appropriate tone."],
      ["Privacy", "Learn how family details should be handled with care."],
    ],
    cta: "Read the FAQ",
  },
  de: {
    title: "Kundendienst",
    intro:
      "Fragen zu einer Geschichte, Datenschutz oder deinem Konto? Wir bereiten einfache Wege vor, damit Familien schnell Hilfe bekommen.",
    cards: [
      ["Kontakt", "Erreiche uns bei Fragen zu Geschichten, Bestellungen und Konten."],
      ["Hilfe zur Geschichte", "Erhalte Hilfe bei Thema, Widmung oder altersgerechtem Ton."],
      ["Datenschutz", "Erfahre, wie Familiendetails sorgfältig behandelt werden sollten."],
    ],
    cta: "FAQ lesen",
  },
  es: {
    title: "Atención al cliente",
    intro:
      "¿Tienes preguntas sobre un cuento, la privacidad o tu cuenta? Estamos preparando formas sencillas para que las familias reciban ayuda.",
    cards: [
      ["Contacto", "Escríbenos si tienes preguntas sobre cuentos, pedidos o cuentas."],
      ["Ayuda con el cuento", "Recibe ayuda para elegir tema, dedicatoria o tono adecuado para la edad."],
      ["Privacidad", "Descubre cómo deben tratarse con cuidado los detalles familiares."],
    ],
    cta: "Leer FAQ",
  },
} satisfies Record<Language, { title: string; intro: string; cards: [string, string][]; cta: string }>;

const icons = [Mail, MessageCircle, ShieldCheck];

export default async function SupportPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        {t.intro}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.cards.map(([title, text], index) => {
          const Icon = icons[index];

          return (
            <Card key={title} className="rounded-3xl bg-white">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <Icon className="h-5 w-5 text-blue-700" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button asChild className="mt-10 rounded-full">
        <Link href="/faq">{t.cta}</Link>
      </Button>
    </section>
  );
}
