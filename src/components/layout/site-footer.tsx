import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import { DEFAULT_LANGUAGE, type Language, siteCopy } from "@/lib/i18n";

type SiteFooterProps = {
  language: Language;
};

type FooterLink = {
  href: string;
  label: string;
};

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          className="text-sm font-medium leading-5 text-muted-foreground transition hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteFooter({ language = DEFAULT_LANGUAGE }: SiteFooterProps) {
  const t = siteCopy[language].footer;

  return (
    <footer className="border-t bg-white text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[1.05fr_1fr_0.95fr] md:gap-0">
        <div className="md:border-r md:border-border md:pr-10">
          <h2 className="text-base font-extrabold">{t.world}</h2>
          <FooterLinks links={t.products} />
        </div>

        <div className="md:border-r md:border-border md:px-10 md:pt-9">
          <FooterLinks links={t.storyLinks} />
        </div>

        <div className="md:pl-10">
          <h2 className="text-base font-extrabold">{t.support}</h2>
          <FooterLinks links={t.supportLinks} />

          <p className="mt-12 text-base font-extrabold">© {APP_NAME} AG</p>
          <FooterLinks links={t.companyLinks} />
        </div>
      </div>
    </footer>
  );
}
