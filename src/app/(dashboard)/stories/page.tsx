import { StoryCard } from "@/components/dashboard/story-card";
import { Story } from "@/types/story";

const stories: Story[] = [
  {
    id: "1",
    userId: "demo-user",
    title: "Emma und der Mondgarten",
    child: {
      name: "Emma",
      age: 6,
      gender: "girl",
      interests: "Malen, Sterne und kleine Abenteuer",
      favoriteAnimal: "Fuchs",
      favoriteColor: "Lila",
      favoriteHobby: "Zeichnen",
    },
    theme: "bedtime",
    moral: "creativity",
    dedication: "Für Emma, die immer an ihre Fantasie glauben soll.",
    previewText:
      "Emma entdeckte eines Abends einen kleinen Mondgarten hinter ihrem Fenster...",
    fullText: null,
    status: "preview_generated",
    pdfUrl: null,
    createdAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    id: "2",
    userId: "demo-user",
    title: "Leo und die sprechenden Füchse",
    child: {
      name: "Leo",
      age: 5,
      gender: "boy",
      interests: "Tiere, Wald und Geschichten",
      favoriteAnimal: "Fuchs",
      favoriteColor: "Blau",
      favoriteHobby: "Bauen",
    },
    theme: "magical_animals",
    moral: "friendship",
    dedication: null,
    previewText:
      "Leo folgte einem freundlichen Fuchs in einen Wald voller kleiner Wunder...",
    fullText: null,
    status: "ready",
    pdfUrl: "/demo/leo-fuchs.pdf",
    createdAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
];

export default function StoriesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Meine Märchen</h1>
      <p className="mt-2 text-muted-foreground">
        Hier erscheinen später alle Märchen des angemeldeten Nutzers.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
