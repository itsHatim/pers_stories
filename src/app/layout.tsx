import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentLanguage } from "@/lib/i18n-server";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MiCuento | Personalisierte Kindergeschichten",
  description:
    "Erstelle personalisierte Kindergeschichten, in denen dein Kind die Hauptrolle spielt.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getCurrentLanguage();

  return (
    <html lang={language}>
      <body className={`${nunito.variable} font-sans`}>
        <SiteHeader language={language} />
        <main className="min-h-screen">{children}</main>
        <SiteFooter language={language} />
      </body>
    </html>
  );
}
