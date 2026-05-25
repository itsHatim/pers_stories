import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Language } from "@/lib/i18n";
import { getCurrentLanguage } from "@/lib/i18n-server";

const copy = {
  en: {
    title: "Log in",
    intro: "Sign in to manage your fairy tales.",
    email: "Email",
    password: "Password",
    submit: "Log in",
  },
  de: {
    title: "Einloggen",
    intro: "Melde dich an, um deine Märchen zu verwalten.",
    email: "E-Mail",
    password: "Passwort",
    submit: "Einloggen",
  },
  es: {
    title: "Entrar",
    intro: "Inicia sesión para gestionar tus cuentos.",
    email: "Correo electrónico",
    password: "Contraseña",
    submit: "Entrar",
  },
} satisfies Record<Language, Record<string, string>>;

export default async function LoginPage() {
  const language = await getCurrentLanguage();
  const t = copy[language];

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-2 text-muted-foreground">{t.intro}</p>

      <form className="mt-8 grid gap-5">
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
