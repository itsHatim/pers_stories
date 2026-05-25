export const SUPPORTED_LANGUAGES = ["en", "de", "es"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_COOKIE = "micuento-language";

export const LANGUAGE_OPTIONS: {
  value: Language;
  label: string;
  shortLabel: string;
}[] = [
  { value: "en", label: "English", shortLabel: "EN" },
  { value: "de", label: "Deutsch", shortLabel: "DE" },
  { value: "es", label: "Español", shortLabel: "ES" },
];

export function isLanguage(value: string | undefined): value is Language {
  return SUPPORTED_LANGUAGES.some((language) => language === value);
}

export function getLanguage(value: string | undefined): Language {
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export const siteCopy = {
  en: {
    nav: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Examples", href: "/examples" },
      { label: "FAQ", href: "/faq" },
    ],
    actions: {
      login: "Log in",
      create: "Create story",
    },
    footer: {
      description:
        "Personalized children's stories that turn names, interests, and little details into an emotional reading experience.",
      product: "Product",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
    },
    language: {
      label: "Language",
    },
  },
  de: {
    nav: [
      { label: "Startseite", href: "/" },
      { label: "Preise", href: "/pricing" },
      { label: "Beispiele", href: "/examples" },
      { label: "FAQ", href: "/faq" },
    ],
    actions: {
      login: "Einloggen",
      create: "Märchen erstellen",
    },
    footer: {
      description:
        "Personalisierte Kindergeschichten, die Namen, Interessen und kleine Details in ein emotionales Leseerlebnis verwandeln.",
      product: "Produkt",
      legal: "Rechtliches",
      privacy: "Datenschutz",
      terms: "AGB",
    },
    language: {
      label: "Sprache",
    },
  },
  es: {
    nav: [
      { label: "Inicio", href: "/" },
      { label: "Precios", href: "/pricing" },
      { label: "Ejemplos", href: "/examples" },
      { label: "FAQ", href: "/faq" },
    ],
    actions: {
      login: "Entrar",
      create: "Crear cuento",
    },
    footer: {
      description:
        "Cuentos infantiles personalizados que convierten nombres, intereses y pequeños detalles en una experiencia de lectura emocional.",
      product: "Producto",
      legal: "Legal",
      privacy: "Privacidad",
      terms: "Términos",
    },
    language: {
      label: "Idioma",
    },
  },
} satisfies Record<Language, object>;
