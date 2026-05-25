import Link from "next/link";

import { Story } from "@/types/story";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Language } from "@/lib/i18n";

type StoryCardProps = {
  story: Story;
  language: Language;
};

const copy = {
  en: {
    status: {
      draft: "Draft",
      preview_generated: "Preview ready",
      paid: "Paid",
      generating: "Generating",
      ready: "Ready",
      failed: "Failed",
    },
    themes: {
      space_adventure: "Space adventure",
      magical_animals: "Magical animals",
      superhero: "Superhero",
      birthday: "Birthday",
      bedtime: "Calm bedtime",
      courage: "Growing brave",
    },
    child: "Child",
    age: "Age",
    theme: "Theme",
    animal: "Favorite animal",
    view: "View story",
  },
  de: {
    status: {
      draft: "Entwurf",
      preview_generated: "Vorschau erstellt",
      paid: "Bezahlt",
      generating: "Wird erstellt",
      ready: "Fertig",
      failed: "Fehlgeschlagen",
    },
    themes: {
      space_adventure: "Weltraumabenteuer",
      magical_animals: "Magische Tiere",
      superhero: "Superheld",
      birthday: "Geburtstag",
      bedtime: "Ruhig einschlafen",
      courage: "Mutig werden",
    },
    child: "Kind",
    age: "Alter",
    theme: "Thema",
    animal: "Lieblingstier",
    view: "Märchen ansehen",
  },
  es: {
    status: {
      draft: "Borrador",
      preview_generated: "Vista previa lista",
      paid: "Pagado",
      generating: "Generando",
      ready: "Listo",
      failed: "Error",
    },
    themes: {
      space_adventure: "Aventura espacial",
      magical_animals: "Animales mágicos",
      superhero: "Superhéroe",
      birthday: "Cumpleaños",
      bedtime: "Dormir tranquilo",
      courage: "Ser valiente",
    },
    child: "Niño",
    age: "Edad",
    theme: "Tema",
    animal: "Animal favorito",
    view: "Ver cuento",
  },
} satisfies Record<Language, {
  status: Record<Story["status"], string>;
  themes: Record<Story["theme"], string>;
  child: string;
  age: string;
  theme: string;
  animal: string;
  view: string;
}>;

export function StoryCard({ story, language }: StoryCardProps) {
  const t = copy[language];

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{story.title}</CardTitle>
          <Badge variant="outline">{t.status[story.status]}</Badge>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p>
          {t.child}: {story.child.name}
        </p>
        <p>
          {t.age}: {story.child.age}
        </p>
        <p>
          {t.theme}: {t.themes[story.theme]}
        </p>
        <p>
          {t.animal}: {story.child.favoriteAnimal}
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full rounded-full">
          <Link href={`/stories/${story.id}`}>{t.view}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
