import { StoryForm } from "@/components/story-builder/story-form";

export default function CreateStoryPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Erstelle ein persönliches Märchen
        </h1>
        <p className="mt-4 text-muted-foreground">
          Gib die wichtigsten Details ein. Backend, KI, Zahlung und PDF-Erstellung
          werden später ergänzt.
        </p>
      </div>

      <StoryForm />
    </section>
  );
}
