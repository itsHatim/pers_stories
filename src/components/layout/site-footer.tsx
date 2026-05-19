import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold">{APP_NAME}</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Personalisierte Kindergeschichten, die Namen, Interessen und kleine
            Details in ein emotionales Leseerlebnis verwandeln.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Produkt</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/pricing">Preise</Link>
            <Link href="/examples">Beispiele</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Rechtliches</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/privacy">Datenschutz</Link>
            <Link href="/terms">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
