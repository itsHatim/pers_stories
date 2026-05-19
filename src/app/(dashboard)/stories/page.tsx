import { StoryCard } from "@/components/dashboard/story-card";
import { Story } from "@/types/story";

const stories: Story[] = [
  {
    id: "1",
    title: "Emma und der Mondgarten",
    childName: "Emma",
    childAge: 6,
    language: "de",
    theme: "Traumreise",
    status: "preview",
    createdAt: "2026-05-18",
  },
  {
    id: "2",
    title: "Leo und die sprechenden Füchse",
    childName: "Leo",
    childAge: 5,
    language: "de",
    theme: "Magische Tiere",
    status: "completed",
    createdAt: "2026-05-18",
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
