import { Button } from "@/components/ui/button";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

type StoryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const copy = {
  en: {
    id: "Story ID",
    title: "Personalized fairy tale preview",
    text: "Once upon a time there was a child with a great imagination. One morning, the child discovered a mysterious letter that led to an adventure full of courage, friendship, and little wonders...",
    pay: "Go to payment",
    download: "Download PDF",
  },
  de: {
    id: "Märchen-ID",
    title: "Vorschau des personalisierten Märchens",
    text: "Es war einmal ein Kind mit einer großen Fantasie. Eines Morgens entdeckte es einen geheimnisvollen Brief, der zu einem Abenteuer voller Mut, Freundschaft und kleiner Wunder führte...",
    pay: "Zur Zahlung",
    download: "PDF herunterladen",
  },
  es: {
    id: "ID del cuento",
    title: "Vista previa del cuento personalizado",
    text: "Había una vez un niño con una gran imaginación. Una mañana descubrió una carta misteriosa que lo llevó a una aventura llena de valentía, amistad y pequeños milagros...",
    pay: "Ir al pago",
    download: "Descargar PDF",
  },
} satisfies Record<Language, Record<string, string>>;

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { id } = await params;
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-muted-foreground">
        {t.id}: {id}
      </p>

      <h1 className="mt-2 text-4xl font-bold tracking-tight">{t.title}</h1>

      <div className="mt-8 rounded-3xl border bg-white p-8 leading-8 shadow-sm">
        <p>{t.text}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button className="rounded-full">{t.pay}</Button>
        <Button variant="outline" className="rounded-full">
          {t.download}
        </Button>
      </div>
    </section>
  );
}
