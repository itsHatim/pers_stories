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
  preview: "Vorschau",
  paid: "Bezahlt",
  completed: "Fertig",
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
        <p>Kind: {story.childName}</p>
        <p>Alter: {story.childAge}</p>
        <p>Sprache: Deutsch</p>
        <p>Thema: {story.theme}</p>
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full rounded-full">
          <Link href={`/stories/${story.id}`}>Märchen ansehen</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
