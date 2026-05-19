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

type StoryCardProps = {
  story: Story;
};

const statusLabels: Record<Story["status"], string> = {
  draft: "Entwurf",
  preview_generated: "Vorschau erstellt",
  paid: "Bezahlt",
  generating: "Wird erstellt",
  ready: "Fertig",
  failed: "Fehlgeschlagen",
};

const themeLabels: Record<Story["theme"], string> = {
  space_adventure: "Weltraumabenteuer",
  magical_animals: "Magische Tiere",
  superhero: "Superheld",
  birthday: "Geburtstag",
  bedtime: "Ruhig einschlafen",
  courage: "Mutig werden",
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{story.title}</CardTitle>
          <Badge variant="outline">{statusLabels[story.status]}</Badge>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p>Kind: {story.child.name}</p>
        <p>Alter: {story.child.age}</p>
        <p>Thema: {themeLabels[story.theme]}</p>
        <p>Lieblingstier: {story.child.favoriteAnimal}</p>
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full rounded-full">
          <Link href={`/stories/${story.id}`}>Märchen ansehen</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
