import { STORY_LANGUAGES, STORY_THEMES } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function StoryForm() {
  return (
    <Card className="mx-auto max-w-3xl rounded-3xl">
      <CardHeader>
        <CardTitle>Personalisiertes Märchen erstellen</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="childName">Name des Kindes</Label>
            <Input id="childName" placeholder="Zum Beispiel: Emma, Leo, Mia" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="age">Alter</Label>
            <Input id="age" type="number" placeholder="Zum Beispiel: 6" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="language">Sprache</Label>
            <select
              id="language"
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              {STORY_LANGUAGES.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="theme">Abenteuer</Label>
            <select
              id="theme"
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              {STORY_THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="details">Besondere Details</Label>
            <Textarea
              id="details"
              placeholder="Lieblingstiere, Hobbys, Freunde, Mutmach-Themen oder besondere Wünsche..."
            />
          </div>

          <Button type="button" size="lg" className="rounded-full">
            Vorschau generieren
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
