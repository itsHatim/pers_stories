import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const examples = [
  "Emma und der Mondgarten",
  "Leo und die sprechenden Füchse",
  "Mia und der mutige Regenbogen",
  "Noah auf dem Planeten der Wünsche",
];

export default function ExamplesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Beispiele</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Diese Beispielideen zeigen, welche Arten von personalisierten
        Kindergeschichten später möglich sein können.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {examples.map((title) => (
          <Card key={title} className="rounded-3xl">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Eine warme, fantasievolle Geschichte mit persönlicher Hauptfigur,
                emotionaler Botschaft und kindgerechter Sprache.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
