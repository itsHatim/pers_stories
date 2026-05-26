"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Gift,
  Heart,
  PencilLine,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Language } from "@/lib/i18n";

type Banner = {
  badge: string;
  title: string;
  description: string;
  checks: string[];
  storyTitle: string;
  storyText: string;
  swatches: string[];
  icon: "book" | "sparkles" | "gift" | "heart";
  visual: "storybook" | "ingredients" | "gift" | "editor";
};

const copy = {
  en: {
    primary: "Create my story",
    secondary: "View examples",
    preview: "Preview",
    banners: [
      {
        badge: "Personalized fairy tales for children",
        title: "Create a fairy tale where your child is the hero",
        description:
          "Turn names, interests, and small family moments into a loving story your child will want to read again and again.",
        checks: ["Personal & emotional", "PDF planned", "Ideal as a gift"],
        storyTitle: "Leo and the Star Forest",
        storyText:
          "One evening, Leo discovered a tiny golden door behind his bookshelf. Beyond it waited a forest where every star knew his name...",
        swatches: ["bg-orange-200", "bg-pink-200", "bg-blue-200"],
        icon: "book",
        visual: "storybook",
      },
      {
        badge: "Made from your child's details",
        title: "Add their favorite things and watch the story become theirs",
        description:
          "A name, a hobby, a pet, a place they love: the story preview uses the details you enter to feel personal from the first page.",
        checks: ["Favorite places", "Family details", "Age friendly"],
        storyTitle: "Mia and the Moon Bakery",
        storyText:
          "Mia followed the smell of cinnamon to a bakery on the moon, where every cookie was shaped like a dream she had told her grandma...",
        swatches: ["bg-amber-200", "bg-violet-200", "bg-emerald-200"],
        icon: "sparkles",
        visual: "ingredients",
      },
      {
        badge: "A thoughtful gift idea",
        title: "Create a bedtime story that feels made for one child",
        description:
          "Perfect for birthdays, newborn welcomes, school milestones, or a small surprise after an ordinary day.",
        checks: ["Warm tone", "Gift-ready", "Memorable"],
        storyTitle: "Noah's Birthday Rocket",
        storyText:
          "Noah opened a silver envelope and found a ticket for a rocket powered by wishes, stickers, and one very brave laugh...",
        swatches: ["bg-rose-200", "bg-sky-200", "bg-lime-200"],
        icon: "gift",
        visual: "gift",
      },
      {
        badge: "Preview before you continue",
        title: "See the fictional story direction before the final version",
        description:
          "The preview helps you check the mood, theme, and personal details before moving forward with the full story flow.",
        checks: ["Story preview", "Easy edits", "Clear next step"],
        storyTitle: "Sofia and the Hidden Garden",
        storyText:
          "Behind the red gate, Sofia found a garden that bloomed when she asked kind questions and listened for tiny answers...",
        swatches: ["bg-teal-200", "bg-fuchsia-200", "bg-orange-200"],
        icon: "heart",
        visual: "editor",
      },
    ],
  },
  de: {
    primary: "Mein Maerchen erstellen",
    secondary: "Beispiele ansehen",
    preview: "Vorschau",
    banners: [
      {
        badge: "Personalisierte Maerchen fuer Kinder",
        title: "Erstelle ein Maerchen, in dem dein Kind die Hauptrolle spielt",
        description:
          "Verwandle Namen, Interessen und kleine Familienmomente in eine liebevolle Geschichte, die dein Kind immer wieder lesen moechte.",
        checks: ["Persoenlich & emotional", "Als PDF geplant", "Ideal als Geschenk"],
        storyTitle: "Leo und der Sternenwald",
        storyText:
          "Eines Abends entdeckte Leo eine kleine goldene Tuer hinter seinem Buecherregal. Dahinter wartete ein Wald, in dem jeder Stern seinen Namen kannte...",
        swatches: ["bg-orange-200", "bg-pink-200", "bg-blue-200"],
        icon: "book",
        visual: "storybook",
      },
      {
        badge: "Aus den Details deines Kindes",
        title: "Fuege Lieblingsdinge hinzu und die Geschichte wird persoenlich",
        description:
          "Ein Name, ein Hobby, ein Haustier oder ein Lieblingsort: die Vorschau nutzt deine Angaben fuer eine persoenliche erste Seite.",
        checks: ["Lieblingsorte", "Familienmomente", "Altersgerecht"],
        storyTitle: "Mia und die Mondbaeckerei",
        storyText:
          "Mia folgte dem Zimtduft zu einer Baeckerei auf dem Mond, wo jeder Keks wie ein Traum aussah, den sie ihrer Oma erzaehlt hatte...",
        swatches: ["bg-amber-200", "bg-violet-200", "bg-emerald-200"],
        icon: "sparkles",
        visual: "ingredients",
      },
      {
        badge: "Eine liebevolle Geschenkidee",
        title: "Gestalte eine Gutenachtgeschichte fuer ein ganz besonderes Kind",
        description:
          "Passend fuer Geburtstage, Willkommensgeschenke, Schulmomente oder eine kleine Ueberraschung an einem normalen Tag.",
        checks: ["Warmer Ton", "Als Geschenk", "Unvergesslich"],
        storyTitle: "Noahs Geburtstagsrakete",
        storyText:
          "Noah oeffnete einen silbernen Umschlag und fand ein Ticket fuer eine Rakete aus Wuenschen, Stickern und einem mutigen Lachen...",
        swatches: ["bg-rose-200", "bg-sky-200", "bg-lime-200"],
        icon: "gift",
        visual: "gift",
      },
      {
        badge: "Vorschau vor dem naechsten Schritt",
        title: "Pruefe die Richtung der Geschichte vor der finalen Version",
        description:
          "Die Vorschau zeigt Stimmung, Thema und persoenliche Details, bevor du mit dem vollstaendigen Ablauf weitermachst.",
        checks: ["Story-Vorschau", "Einfach anpassen", "Klarer naechster Schritt"],
        storyTitle: "Sofia und der geheime Garten",
        storyText:
          "Hinter dem roten Tor fand Sofia einen Garten, der bluehte, wenn sie freundliche Fragen stellte und auf leise Antworten hoerte...",
        swatches: ["bg-teal-200", "bg-fuchsia-200", "bg-orange-200"],
        icon: "heart",
        visual: "editor",
      },
    ],
  },
  es: {
    primary: "Crear mi cuento",
    secondary: "Ver ejemplos",
    preview: "Vista previa",
    banners: [
      {
        badge: "Cuentos personalizados para ninos",
        title: "Crea un cuento donde tu hijo sea el protagonista",
        description:
          "Convierte nombres, intereses y pequenos momentos familiares en una historia carinosa que tu hijo querra leer una y otra vez.",
        checks: ["Personal y emotivo", "PDF previsto", "Ideal como regalo"],
        storyTitle: "Leo y el bosque de estrellas",
        storyText:
          "Una noche, Leo descubrio una pequena puerta dorada detras de su estanteria. Al otro lado lo esperaba un bosque donde cada estrella conocia su nombre...",
        swatches: ["bg-orange-200", "bg-pink-200", "bg-blue-200"],
        icon: "book",
        visual: "storybook",
      },
      {
        badge: "Hecho con sus detalles",
        title: "Anade sus cosas favoritas y mira como el cuento se vuelve suyo",
        description:
          "Un nombre, un hobby, una mascota o un lugar especial: la vista previa usa lo que escribes para sentirse personal desde la primera pagina.",
        checks: ["Lugares favoritos", "Detalles familiares", "Por edad"],
        storyTitle: "Mia y la panaderia lunar",
        storyText:
          "Mia siguio el olor a canela hasta una panaderia en la luna, donde cada galleta tenia la forma de un sueno contado a su abuela...",
        swatches: ["bg-amber-200", "bg-violet-200", "bg-emerald-200"],
        icon: "sparkles",
        visual: "ingredients",
      },
      {
        badge: "Una idea bonita para regalar",
        title: "Crea un cuento de buenas noches para un nino especial",
        description:
          "Perfecto para cumpleanos, bienvenida de un bebe, momentos de escuela o una sorpresa pequena en un dia normal.",
        checks: ["Tono tierno", "Listo para regalo", "Memorable"],
        storyTitle: "El cohete de cumpleanos de Noah",
        storyText:
          "Noah abrio un sobre plateado y encontro un boleto para un cohete impulsado por deseos, pegatinas y una risa valiente...",
        swatches: ["bg-rose-200", "bg-sky-200", "bg-lime-200"],
        icon: "gift",
        visual: "gift",
      },
      {
        badge: "Vista previa antes de continuar",
        title: "Revisa la direccion del cuento antes de la version final",
        description:
          "La vista previa ayuda a comprobar el tono, el tema y los detalles personales antes de seguir con el cuento completo.",
        checks: ["Preview del cuento", "Facil de editar", "Siguiente paso claro"],
        storyTitle: "Sofia y el jardin escondido",
        storyText:
          "Detras de la puerta roja, Sofia encontro un jardin que florecia cuando hacia preguntas amables y escuchaba respuestas pequenas...",
        swatches: ["bg-teal-200", "bg-fuchsia-200", "bg-orange-200"],
        icon: "heart",
        visual: "editor",
      },
    ],
  },
} satisfies Record<
  Language,
  {
    primary: string;
    secondary: string;
    preview: string;
    banners: Banner[];
  }
>;

type HeroSectionProps = {
  language: Language;
};

export function HeroSection({ language }: HeroSectionProps) {
  const t = copy[language];
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % t.banners.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [t.banners.length]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_35%),radial-gradient(circle_at_top_right,#bfdbfe,transparent_30%),linear-gradient(to_bottom,#fff7ed,#ffffff)]" />

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeBanner * 100}%)` }}
      >
        {t.banners.map((banner, index) => (
          <HeroBanner
            key={banner.title}
            banner={banner}
            index={index}
            primary={t.primary}
            secondary={t.secondary}
            preview={t.preview}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {t.banners.map((banner, index) => (
          <button
            key={banner.title}
            type="button"
            aria-label={`Show banner ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              activeBanner === index ? "w-8 bg-slate-950" : "w-2.5 bg-slate-300"
            }`}
            onClick={() => setActiveBanner(index)}
          />
        ))}
      </div>
    </section>
  );
}

function HeroBanner({
  banner,
  index,
  primary,
  secondary,
  preview,
}: {
  banner: Banner;
  index: number;
  primary: string;
  secondary: string;
  preview: string;
}) {
  const backgroundClasses = [
    "bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_34%),radial-gradient(circle_at_top_right,#bfdbfe,transparent_30%),linear-gradient(to_bottom,#fff7ed,#ffffff)]",
    "bg-[radial-gradient(circle_at_15%_20%,#bbf7d0,transparent_30%),radial-gradient(circle_at_85%_25%,#ddd6fe,transparent_32%),linear-gradient(to_bottom,#f8fafc,#ffffff)]",
    "bg-[radial-gradient(circle_at_20%_15%,#fecdd3,transparent_32%),radial-gradient(circle_at_80%_30%,#bae6fd,transparent_30%),linear-gradient(to_bottom,#fff1f2,#ffffff)]",
    "bg-[radial-gradient(circle_at_18%_18%,#99f6e4,transparent_30%),radial-gradient(circle_at_84%_24%,#fed7aa,transparent_32%),linear-gradient(to_bottom,#f0fdfa,#ffffff)]",
  ];

  return (
    <div className={`min-w-full px-4 py-20 lg:py-28 ${backgroundClasses[index]}`}>
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Badge className="mb-5 rounded-full px-4 py-2">{banner.badge}</Badge>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            {banner.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            {banner.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full">
              <Link href="/create">
                {primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full bg-white/70"
            >
              <Link href="/examples">{secondary}</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
            {banner.checks.map((check) => (
              <div key={check} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                {check}
              </div>
            ))}
          </div>
        </div>

        <HeroVisual banner={banner} preview={preview} />
      </div>
    </div>
  );
}

function HeroVisual({ banner, preview }: { banner: Banner; preview: string }) {
  if (banner.visual === "ingredients") {
    return <IngredientsVisual banner={banner} />;
  }

  if (banner.visual === "gift") {
    return <GiftVisual banner={banner} />;
  }

  if (banner.visual === "editor") {
    return <EditorVisual banner={banner} preview={preview} />;
  }

  return <StorybookVisual banner={banner} preview={preview} />;
}

function StorybookVisual({ banner, preview }: { banner: Banner; preview: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-orange-200 blur-3xl" />
      <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-blue-200 blur-3xl" />

      <div className="relative rounded-[2rem] border bg-white p-5 shadow-2xl">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 p-6">
          <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{preview}</Badge>
              <BannerIcon icon={banner.icon} />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-950">
              {banner.storyTitle}
            </h2>

            <p className="mt-4 leading-7 text-slate-600">{banner.storyText}</p>

            <Swatches swatches={banner.swatches} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IngredientsVisual({ banner }: { banner: Banner }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -right-8 top-4 h-36 w-36 rounded-full bg-emerald-200 blur-3xl" />
      <div className="absolute -left-8 bottom-8 h-36 w-36 rounded-full bg-violet-200 blur-3xl" />

      <div className="relative grid gap-4">
        {banner.checks.map((check, index) => (
          <div
            key={check}
            className={`rounded-3xl border bg-white/85 p-5 shadow-xl backdrop-blur ${
              index === 1 ? "ml-8" : index === 2 ? "mr-8" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                0{index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">{check}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {index === 0
                    ? banner.storyTitle
                    : index === 1
                      ? banner.storyText.slice(0, 82)
                      : banner.storyText.slice(82, 160)}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute -right-2 -top-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-lg">
          <WandSparkles className="h-7 w-7 text-emerald-500" />
        </div>
      </div>
    </div>
  );
}

function GiftVisual({ banner }: { banner: Banner }) {
  return (
    <div className="relative mx-auto flex w-full max-w-md justify-center">
      <div className="absolute inset-x-8 bottom-2 h-20 rounded-full bg-rose-200 blur-3xl" />

      <div className="relative w-72 rotate-[-5deg] rounded-[2rem] bg-slate-950 p-4 shadow-2xl">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-rose-200 via-white to-sky-200 p-5">
          <div className="flex h-80 flex-col justify-between rounded-2xl border border-white/70 bg-white/80 p-5">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100">
                <Gift className="h-7 w-7 text-rose-500" />
              </div>
              <h2 className="mt-8 text-3xl font-bold leading-tight text-slate-950">
                {banner.storyTitle}
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">{banner.storyText}</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-2 top-10 w-36 rotate-6 rounded-3xl border bg-white p-4 shadow-xl">
        <p className="text-xs font-semibold uppercase text-slate-400">Gift note</p>
        <p className="mt-2 text-sm font-semibold text-slate-950">
          {banner.checks[2]}
        </p>
      </div>
    </div>
  );
}

function EditorVisual({ banner, preview }: { banner: Banner; preview: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-6 bottom-8 h-32 w-32 rounded-full bg-teal-200 blur-3xl" />
      <div className="absolute -right-6 top-8 h-32 w-32 rounded-full bg-orange-200 blur-3xl" />

      <div className="relative rounded-[2rem] border bg-white p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b px-2 pb-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-300" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-300" />
          </div>
          <Badge variant="secondary">{preview}</Badge>
        </div>

        <div className="grid gap-4 p-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <PencilLine className="h-5 w-5 text-teal-500" />
              <p className="text-sm font-semibold text-slate-950">
                {banner.storyTitle}
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {banner.storyText}
            </p>
          </div>

          {banner.checks.map((check) => (
            <div key={check} className="flex items-center justify-between rounded-2xl border p-4">
              <span className="text-sm font-medium text-slate-700">{check}</span>
              <Check className="h-4 w-4 text-green-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Swatches({ swatches }: { swatches: string[] }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      {swatches.map((swatch) => (
        <div key={swatch} className={`h-20 rounded-2xl ${swatch}`} />
      ))}
    </div>
  );
}

function BannerIcon({ icon }: { icon: Banner["icon"] }) {
  const className = "h-5 w-5 text-orange-500";

  if (icon === "sparkles") {
    return <Sparkles className={className} />;
  }

  if (icon === "gift") {
    return <Gift className={className} />;
  }

  if (icon === "heart") {
    return <Heart className={className} />;
  }

  return <BookOpen className={className} />;
}
