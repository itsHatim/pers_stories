import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Create account",
    intro: "Create an account to save personalized fairy tales.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    password: "Password",
    submit: "Sign up",
  },
  de: {
    title: "Konto erstellen",
    intro: "Erstelle ein Konto, um personalisierte Märchen zu speichern.",
    name: "Name",
    namePlaceholder: "Dein Name",
    email: "E-Mail",
    password: "Passwort",
    submit: "Registrieren",
  },
  es: {
    title: "Crear cuenta",
    intro: "Crea una cuenta para guardar cuentos personalizados.",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    submit: "Registrarse",
  },
} satisfies Record<Language, Record<string, string>>;

export default async function SignupPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-2 text-muted-foreground">{t.intro}</p>

      <form className="mt-8 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">{t.name}</Label>
          <Input id="name" placeholder={t.namePlaceholder} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">{t.email}</Label>
          <Input id="email" type="email" placeholder="name@email.com" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{t.password}</Label>
          <Input id="password" type="password" placeholder="********" />
        </div>

        <Button type="button" className="rounded-full">
          {t.submit}
        </Button>
      </form>
    </section>
  );
}
