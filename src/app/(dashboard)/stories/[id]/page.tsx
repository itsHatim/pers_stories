import { Button } from "@/components/ui/button";

type StoryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-muted-foreground">Märchen-ID: {id}</p>

      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Vorschau des personalisierten Märchens
      </h1>

      <div className="mt-8 rounded-3xl border bg-white p-8 leading-8 shadow-sm">
        <p>
          Es war einmal ein Kind mit einer großen Fantasie. Eines Morgens
          entdeckte es einen geheimnisvollen Brief, der zu einem Abenteuer voller
          Mut, Freundschaft und kleiner Wunder führte...
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button className="rounded-full">Zur Zahlung</Button>
        <Button variant="outline" className="rounded-full">
          PDF herunterladen
        </Button>
      </div>
    </section>
  );
}