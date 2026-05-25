import Link from "next/link";
import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageDropdown } from "@/components/layout/language-dropdown";
import { APP_NAME } from "@/lib/constants";
import { DEFAULT_LANGUAGE, type Language, siteCopy } from "@/lib/i18n";

type SiteHeaderProps = {
  language: Language;
};

export function SiteHeader({ language = DEFAULT_LANGUAGE }: SiteHeaderProps) {
  const t = siteCopy[language];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-100">
            <BookOpen className="h-5 w-5 text-orange-600" />
          </span>
          <span className="text-xl tracking-tight">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {t.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageDropdown currentLanguage={language} />

          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login">{t.actions.login}</Link>
          </Button>

          <Button asChild className="rounded-full">
            <Link href="/create">{t.actions.create}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
