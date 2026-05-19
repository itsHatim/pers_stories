import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Konto erstellen</h1>
      <p className="mt-2 text-muted-foreground">
        Erstelle ein Konto, um personalisierte Märchen zu speichern.
      </p>

      <form className="mt-8 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Dein Name" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input id="email" type="email" placeholder="name@email.de" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Passwort</Label>
          <Input id="password" type="password" placeholder="********" />
        </div>

        <Button type="button" className="rounded-full">
          Registrieren
        </Button>
      </form>
    </section>
  );
}
