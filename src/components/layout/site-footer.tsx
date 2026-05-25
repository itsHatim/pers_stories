import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import { DEFAULT_LANGUAGE, type Language, siteCopy } from "@/lib/i18n";

type SiteFooterProps = {
  language: Language;
};

export function SiteFooter({ language = DEFAULT_LANGUAGE }: SiteFooterProps) {
  const t = siteCopy[language];

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold">{APP_NAME}</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {t.footer.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t.footer.product}</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/pricing">{t.nav[1].label}</Link>
            <Link href="/examples">{t.nav[2].label}</Link>
            <Link href="/faq">{t.nav[3].label}</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t.footer.legal}</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/privacy">{t.footer.privacy}</Link>
            <Link href="/terms">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
