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
      { label: "About us", href: "/about" },
      { label: "Support", href: "/support" },
    ],
    actions: {
      login: "Log in",
      create: "Create story",
    },
    footer: {
      world: "The World of MiCuento",
      products: [
        { label: "All personalized stories", href: "/examples" },
        { label: "Stories for newborns", href: "/examples" },
        { label: "Stories for children 0-3", href: "/examples" },
        { label: "Stories for children 3-6", href: "/examples" },
        { label: "Greeting cards", href: "/examples" },
        { label: "Art prints", href: "/examples" },
        { label: "Colorful worlds", href: "/examples" },
        { label: "The best hiding place", href: "/examples" },
        { label: "My world trip picture book", href: "/examples" },
        { label: "Books for school children", href: "/examples" },
      ],
      storyLinks: [
        { label: "Your adventure with MiCuento", href: "/create" },
        { label: "Welcome to the world", href: "/examples" },
        { label: "Ready for school", href: "/examples" },
        { label: "My magical orchestra", href: "/examples" },
        { label: "A strong team", href: "/examples" },
        { label: "Heart to heart", href: "/examples" },
        { label: "100 words", href: "/examples" },
        { label: "Moments of happiness", href: "/examples" },
      ],
      support: "Support",
      supportLinks: [
        { label: "Contact us", href: "/support" },
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
        { label: "FAQ", href: "/faq" },
      ],
      companyLinks: [
        { label: "About us", href: "/about" },
        { label: "Our values", href: "/about" },
        { label: "Careers", href: "/about" },
        { label: "MiCuento Blog", href: "/about" },
        { label: "Press", href: "/about" },
      ],
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
      { label: "Über uns", href: "/about" },
      { label: "Kundendienst", href: "/support" },
    ],
    actions: {
      login: "Einloggen",
      create: "Märchen erstellen",
    },
    footer: {
      world: "Die Welt von MiCuento",
      products: [
        { label: "Alle personalisierten Kindergeschichten", href: "/examples" },
        { label: "Geschichten für Neugeborene", href: "/examples" },
        { label: "Geschichten für Kinder von 0-3", href: "/examples" },
        { label: "Geschichten für Kinder von 3-6", href: "/examples" },
        { label: "Grußkarten", href: "/examples" },
        { label: "Art Prints", href: "/examples" },
        { label: "Farbenfroh", href: "/examples" },
        { label: "Das beste Versteck", href: "/examples" },
        { label: "Mein Weltreise-Wimmelbuch", href: "/examples" },
        { label: "Bücher für Schulkinder", href: "/examples" },
      ],
      storyLinks: [
        { label: "Dein fantastischer Ausflug mit MiCuento", href: "/create" },
        { label: "Willkommen auf der Welt", href: "/examples" },
        { label: "Bereit für die Schule", href: "/examples" },
        { label: "Mein fabelhaftes Orchester", href: "/examples" },
        { label: "Ein starkes Team", href: "/examples" },
        { label: "Herz an Herz", href: "/examples" },
        { label: "100 Wörter", href: "/examples" },
        { label: "Momente des Glücks", href: "/examples" },
      ],
      support: "Kundendienst",
      supportLinks: [
        { label: "Kontaktiere uns", href: "/support" },
        { label: "AGB", href: "/terms" },
        { label: "Datenschutz", href: "/privacy" },
        { label: "FAQ", href: "/faq" },
      ],
      companyLinks: [
        { label: "Über uns", href: "/about" },
        { label: "Unsere Werte", href: "/about" },
        { label: "Karriere", href: "/about" },
        { label: "MiCuento Blog", href: "/about" },
        { label: "Presse", href: "/about" },
      ],
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
      { label: "Sobre nosotros", href: "/about" },
      { label: "Soporte", href: "/support" },
    ],
    actions: {
      login: "Entrar",
      create: "Crear cuento",
    },
    footer: {
      world: "El mundo de MiCuento",
      products: [
        { label: "Todos los cuentos personalizados", href: "/examples" },
        { label: "Cuentos para recién nacidos", href: "/examples" },
        { label: "Cuentos para niños de 0-3", href: "/examples" },
        { label: "Cuentos para niños de 3-6", href: "/examples" },
        { label: "Tarjetas de felicitación", href: "/examples" },
        { label: "Láminas artísticas", href: "/examples" },
        { label: "Mundos llenos de color", href: "/examples" },
        { label: "El mejor escondite", href: "/examples" },
        { label: "Mi libro de viaje por el mundo", href: "/examples" },
        { label: "Libros para escolares", href: "/examples" },
      ],
      storyLinks: [
        { label: "Tu aventura fantástica con MiCuento", href: "/create" },
        { label: "Bienvenido al mundo", href: "/examples" },
        { label: "Listo para la escuela", href: "/examples" },
        { label: "Mi orquesta fabulosa", href: "/examples" },
        { label: "Un gran equipo", href: "/examples" },
        { label: "De corazón a corazón", href: "/examples" },
        { label: "100 palabras", href: "/examples" },
        { label: "Momentos de felicidad", href: "/examples" },
      ],
      support: "Atención al cliente",
      supportLinks: [
        { label: "Contáctanos", href: "/support" },
        { label: "Términos", href: "/terms" },
        { label: "Privacidad", href: "/privacy" },
        { label: "FAQ", href: "/faq" },
      ],
      companyLinks: [
        { label: "Sobre nosotros", href: "/about" },
        { label: "Nuestros valores", href: "/about" },
        { label: "Carrera", href: "/about" },
        { label: "Blog de MiCuento", href: "/about" },
        { label: "Prensa", href: "/about" },
      ],
    },
    language: {
      label: "Idioma",
    },
  },
} satisfies Record<Language, object>;
