"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  Globe2,
  Heart,
  PartyPopper,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_LANGUAGE, type Language } from "@/lib/i18n";
import type { ChildGender, StoryMoral, StoryTheme } from "@/types/story";

type StoryFormValues = {
  childName: string;
  childAge: string;
  gender?: ChildGender;
  interests: string;
  favoriteAnimal: string;
  favoriteColor: string;
  favoriteHobby: string;
  storyType: StoryTheme;
  moral: StoryMoral;
  dedication?: string;
};

const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
];

const fieldNames = {
  step1: ["childName", "childAge", "gender"],
  step2: ["interests", "favoriteAnimal", "favoriteColor", "favoriteHobby"],
  step3: ["storyType"],
  step4: ["moral"],
  step5: ["dedication"],
  step6: [],
} as const;

const copy = {
  de: {
    validation: {
      childNameMin: "Bitte gib mindestens 2 Zeichen ein.",
      childNameMax: "Der Name darf maximal 40 Zeichen lang sein.",
      childAgeRequired: "Bitte gib das Alter ein.",
      childAgeRange: "Das Alter sollte zwischen 1 und 12 Jahren liegen.",
      interestsMin: "Bitte beschreibe mindestens ein Interesse.",
      interestsMax: "Bitte halte die Interessen etwas kürzer.",
      animalMin: "Bitte gib ein Lieblingstier ein.",
      animalMax: "Bitte halte das Lieblingstier kürzer.",
      colorMin: "Bitte gib eine Lieblingsfarbe ein.",
      colorMax: "Bitte halte die Farbe kürzer.",
      hobbyMin: "Bitte gib ein Lieblingshobby ein.",
      hobbyMax: "Bitte halte das Hobby kürzer.",
      dedicationMax: "Die Widmung darf maximal 300 Zeichen lang sein.",
    },
    hero: {
      languageLabel: "Sprache",
      badge: "Märchen-Assistent",
      title: "Erstelle ein persönliches Märchen",
      description:
        "Beantworte ein paar einfache Fragen. Danach zeigen wir dir eine erste fiktive Vorschau deiner Geschichte.",
    },
    stepsTitle: "Schritte",
    stepCounter: (current: number, total: number) =>
      `Schritt ${current} von ${total}`,
    steps: [
      {
        id: 1,
        title: "Daten des Kindes",
        description: "Name, Alter und optionale Angaben",
        fields: fieldNames.step1,
      },
      {
        id: 2,
        title: "Persönlichkeit & Interessen",
        description: "Was macht das Kind besonders?",
        fields: fieldNames.step2,
      },
      {
        id: 3,
        title: "Art des Märchens",
        description: "Wähle die Welt der Geschichte",
        fields: fieldNames.step3,
      },
      {
        id: 4,
        title: "Botschaft des Märchens",
        description: "Welche Moral soll die Geschichte vermitteln?",
        fields: fieldNames.step4,
      },
      {
        id: 5,
        title: "Widmung",
        description: "Eine persönliche Nachricht hinzufügen",
        fields: fieldNames.step5,
      },
      {
        id: 6,
        title: "Zusammenfassung",
        description: "Prüfe alle Angaben vor der Vorschau",
        fields: fieldNames.step6,
      },
    ],
    labels: {
      childName: "Name des Kindes",
      childAge: "Alter",
      gender: "Geschlecht optional",
      interests: "Interessen des Kindes",
      favoriteAnimal: "Lieblingstier",
      favoriteColor: "Lieblingsfarbe",
      favoriteHobby: "Lieblingshobby",
      dedication: "Persönliche Widmung optional",
    },
    placeholders: {
      childName: "Zum Beispiel: Emma, Leo, Mia",
      childAge: "Zum Beispiel: 6",
      interests: "Zum Beispiel: Dinosaurier, Malen, Fußball, Sterne, Musik...",
      favoriteAnimal: "Zum Beispiel: Fuchs",
      favoriteColor: "Zum Beispiel: Blau",
      favoriteHobby: "Zum Beispiel: Zeichnen",
      dedication:
        "Zum Beispiel: Für meine kleine Abenteurerin Emma. Mögest du immer an deine Fantasie glauben.",
    },
    helperText: "Du kannst dieses Feld auch leer lassen.",
    storyTypes: {
      space_adventure: {
        label: "Weltraumabenteuer",
        description:
          "Planeten, Sterne und eine große Reise durch das Universum.",
      },
      magical_animals: {
        label: "Magische Tiere",
        description:
          "Sprechende Tiere, ein verzauberter Wald und kleine Wunder.",
      },
      superhero: {
        label: "Superheld",
        description: "Das Kind entdeckt besondere Kräfte und hilft anderen.",
      },
      birthday: {
        label: "Geburtstag",
        description: "Ein besonderer Tag voller Überraschungen und Freude.",
      },
      bedtime: {
        label: "Ruhig einschlafen",
        description: "Eine sanfte Geschichte zum Entspannen vor dem Schlafen.",
      },
      courage: {
        label: "Mutig werden",
        description:
          "Eine Geschichte über Selbstvertrauen und kleine mutige Schritte.",
      },
    },
    morals: {
      friendship: "Freundschaft",
      bravery: "Mut",
      sharing: "Teilen",
      confidence: "Vertrauen",
      family: "Familie",
      creativity: "Kreativität",
    },
    genders: {
      not_specified: "Keine Angabe",
      girl: "Mädchen",
      boy: "Junge",
      diverse: "Divers",
    },
    summary: {
      title: "Zusammenfassung",
      description:
        "Bitte prüfe deine Angaben. Danach kannst du eine fiktive Vorschau generieren.",
      name: "Name",
      age: "Alter",
      ageValue: (age: string) => `${age} Jahre`,
      gender: "Geschlecht",
      interests: "Interessen",
      animal: "Lieblingstier",
      color: "Lieblingsfarbe",
      hobby: "Lieblingshobby",
      storyType: "Art des Märchens",
      moral: "Botschaft",
      dedication: "Widmung",
      noDedication: "Keine Widmung",
      empty: "-",
    },
    buttons: {
      back: "Zurück",
      next: "Weiter",
      generate: "Vorschau generieren",
      generating: "Vorschau wird generiert...",
      download: "Später als PDF herunterladen",
    },
    previewBadge: "Fiktive Vorschau",
    previewTitle: (name: string) => `${name} und das besondere Abenteuer`,
    preview: {
      fallbackStoryType: "Abenteuer",
      fallbackMoral: "Mut",
      dedication: (text: string) =>
        `Vor der Geschichte steht eine liebevolle Widmung: "${text}".`,
      noDedication:
        "Die Geschichte beginnt ohne persönliche Widmung, aber mit viel Wärme.",
      body: (
        data: StoryFormValues,
        storyTypeLabel: string,
        moralLabel: string
      ) => `Es war einmal ein Kind namens ${data.childName}, ${data.childAge} Jahre alt, das ${data.favoriteColor} liebte und am liebsten ${data.favoriteHobby} machte. Eines Tages erschien ein ${data.favoriteAnimal} mit funkelnden Augen und lud ${data.childName} zu einem besonderen ${storyTypeLabel} ein.

Auf dieser Reise entdeckte ${data.childName}, dass ${data.interests} nicht nur ein Interesse war, sondern eine echte Stärke. Schritt für Schritt lernte ${data.childName}, wie wichtig ${moralLabel} ist.

Und als das Abenteuer endete, wusste ${data.childName}: In jeder kleinen Idee kann ein großes Märchen stecken.`,
    },
  },
  en: {
    validation: {
      childNameMin: "Please enter at least 2 characters.",
      childNameMax: "The name can be up to 40 characters long.",
      childAgeRequired: "Please enter the age.",
      childAgeRange: "The age should be between 1 and 12 years.",
      interestsMin: "Please describe at least one interest.",
      interestsMax: "Please keep the interests a little shorter.",
      animalMin: "Please enter a favorite animal.",
      animalMax: "Please keep the animal a little shorter.",
      colorMin: "Please enter a favorite color.",
      colorMax: "Please keep the color a little shorter.",
      hobbyMin: "Please enter a favorite hobby.",
      hobbyMax: "Please keep the hobby a little shorter.",
      dedicationMax: "The dedication can be up to 300 characters long.",
    },
    hero: {
      languageLabel: "Language",
      badge: "Fairy tale assistant",
      title: "Create a personalized fairy tale",
      description:
        "Answer a few simple questions. Then we will show you a first fictional preview of your story.",
    },
    stepsTitle: "Steps",
    stepCounter: (current: number, total: number) =>
      `Step ${current} of ${total}`,
    steps: [
      {
        id: 1,
        title: "Child details",
        description: "Name, age, and optional details",
        fields: fieldNames.step1,
      },
      {
        id: 2,
        title: "Personality & interests",
        description: "What makes the child special?",
        fields: fieldNames.step2,
      },
      {
        id: 3,
        title: "Story type",
        description: "Choose the world of the story",
        fields: fieldNames.step3,
      },
      {
        id: 4,
        title: "Story message",
        description: "Which lesson should the story share?",
        fields: fieldNames.step4,
      },
      {
        id: 5,
        title: "Dedication",
        description: "Add a personal message",
        fields: fieldNames.step5,
      },
      {
        id: 6,
        title: "Summary",
        description: "Review everything before the preview",
        fields: fieldNames.step6,
      },
    ],
    labels: {
      childName: "Child's name",
      childAge: "Age",
      gender: "Gender optional",
      interests: "Child's interests",
      favoriteAnimal: "Favorite animal",
      favoriteColor: "Favorite color",
      favoriteHobby: "Favorite hobby",
      dedication: "Personal dedication optional",
    },
    placeholders: {
      childName: "For example: Emma, Leo, Mia",
      childAge: "For example: 6",
      interests: "For example: dinosaurs, painting, soccer, stars, music...",
      favoriteAnimal: "For example: fox",
      favoriteColor: "For example: blue",
      favoriteHobby: "For example: drawing",
      dedication:
        "For example: For my little adventurer Emma. May you always believe in your imagination.",
    },
    helperText: "You can also leave this field empty.",
    storyTypes: {
      space_adventure: {
        label: "Space adventure",
        description: "Planets, stars, and a big journey through the universe.",
      },
      magical_animals: {
        label: "Magical animals",
        description: "Talking animals, an enchanted forest, and small wonders.",
      },
      superhero: {
        label: "Superhero",
        description: "The child discovers special powers and helps others.",
      },
      birthday: {
        label: "Birthday",
        description: "A special day full of surprises and joy.",
      },
      bedtime: {
        label: "Calm bedtime",
        description: "A gentle story for relaxing before sleep.",
      },
      courage: {
        label: "Growing brave",
        description:
          "A story about confidence and small courageous steps.",
      },
    },
    morals: {
      friendship: "Friendship",
      bravery: "Bravery",
      sharing: "Sharing",
      confidence: "Confidence",
      family: "Family",
      creativity: "Creativity",
    },
    genders: {
      not_specified: "No answer",
      girl: "Girl",
      boy: "Boy",
      diverse: "Diverse",
    },
    summary: {
      title: "Summary",
      description:
        "Please review your details. Then you can generate a fictional preview.",
      name: "Name",
      age: "Age",
      ageValue: (age: string) => `${age} years`,
      gender: "Gender",
      interests: "Interests",
      animal: "Favorite animal",
      color: "Favorite color",
      hobby: "Favorite hobby",
      storyType: "Story type",
      moral: "Message",
      dedication: "Dedication",
      noDedication: "No dedication",
      empty: "-",
    },
    buttons: {
      back: "Back",
      next: "Next",
      generate: "Generate preview",
      generating: "Generating preview...",
      download: "Download as PDF later",
    },
    previewBadge: "Fictional preview",
    previewTitle: (name: string) => `${name} and the special adventure`,
    preview: {
      fallbackStoryType: "adventure",
      fallbackMoral: "bravery",
      dedication: (text: string) =>
        `Before the story begins, there is a loving dedication: "${text}".`,
      noDedication:
        "The story begins without a personal dedication, but with plenty of warmth.",
      body: (
        data: StoryFormValues,
        storyTypeLabel: string,
        moralLabel: string
      ) => `Once upon a time there was a child named ${data.childName}, ${data.childAge} years old, who loved ${data.favoriteColor} and most enjoyed ${data.favoriteHobby}. One day, a ${data.favoriteAnimal} with sparkling eyes appeared and invited ${data.childName} into a special ${storyTypeLabel}.

On this journey, ${data.childName} discovered that ${data.interests} was not just an interest, but a real strength. Step by step, ${data.childName} learned how important ${moralLabel} can be.

And when the adventure ended, ${data.childName} knew: every little idea can hold a great fairy tale.`,
    },
  },
  es: {
    validation: {
      childNameMin: "Introduce al menos 2 caracteres.",
      childNameMax: "El nombre puede tener como máximo 40 caracteres.",
      childAgeRequired: "Introduce la edad.",
      childAgeRange: "La edad debe estar entre 1 y 12 años.",
      interestsMin: "Describe al menos un interés.",
      interestsMax: "Mantén los intereses un poco más cortos.",
      animalMin: "Introduce un animal favorito.",
      animalMax: "Mantén el animal un poco más corto.",
      colorMin: "Introduce un color favorito.",
      colorMax: "Mantén el color un poco más corto.",
      hobbyMin: "Introduce un pasatiempo favorito.",
      hobbyMax: "Mantén el pasatiempo un poco más corto.",
      dedicationMax: "La dedicatoria puede tener como máximo 300 caracteres.",
    },
    hero: {
      languageLabel: "Idioma",
      badge: "Asistente de cuentos",
      title: "Crea un cuento personalizado",
      description:
        "Responde unas preguntas sencillas. Después te mostraremos una primera vista previa ficticia de tu historia.",
    },
    stepsTitle: "Pasos",
    stepCounter: (current: number, total: number) =>
      `Paso ${current} de ${total}`,
    steps: [
      {
        id: 1,
        title: "Datos del niño",
        description: "Nombre, edad y detalles opcionales",
        fields: fieldNames.step1,
      },
      {
        id: 2,
        title: "Personalidad e intereses",
        description: "¿Qué hace especial al niño?",
        fields: fieldNames.step2,
      },
      {
        id: 3,
        title: "Tipo de cuento",
        description: "Elige el mundo de la historia",
        fields: fieldNames.step3,
      },
      {
        id: 4,
        title: "Mensaje del cuento",
        description: "¿Qué enseñanza debe transmitir?",
        fields: fieldNames.step4,
      },
      {
        id: 5,
        title: "Dedicatoria",
        description: "Añade un mensaje personal",
        fields: fieldNames.step5,
      },
      {
        id: 6,
        title: "Resumen",
        description: "Revisa todo antes de la vista previa",
        fields: fieldNames.step6,
      },
    ],
    labels: {
      childName: "Nombre del niño",
      childAge: "Edad",
      gender: "Género opcional",
      interests: "Intereses del niño",
      favoriteAnimal: "Animal favorito",
      favoriteColor: "Color favorito",
      favoriteHobby: "Pasatiempo favorito",
      dedication: "Dedicatoria personal opcional",
    },
    placeholders: {
      childName: "Por ejemplo: Emma, Leo, Mia",
      childAge: "Por ejemplo: 6",
      interests: "Por ejemplo: dinosaurios, pintar, fútbol, estrellas, música...",
      favoriteAnimal: "Por ejemplo: zorro",
      favoriteColor: "Por ejemplo: azul",
      favoriteHobby: "Por ejemplo: dibujar",
      dedication:
        "Por ejemplo: Para mi pequeña aventurera Emma. Que siempre creas en tu imaginación.",
    },
    helperText: "También puedes dejar este campo vacío.",
    storyTypes: {
      space_adventure: {
        label: "Aventura espacial",
        description:
          "Planetas, estrellas y un gran viaje por el universo.",
      },
      magical_animals: {
        label: "Animales mágicos",
        description:
          "Animales que hablan, un bosque encantado y pequeños milagros.",
      },
      superhero: {
        label: "Superhéroe",
        description: "El niño descubre poderes especiales y ayuda a otros.",
      },
      birthday: {
        label: "Cumpleaños",
        description: "Un día especial lleno de sorpresas y alegría.",
      },
      bedtime: {
        label: "Dormir tranquilo",
        description: "Una historia suave para relajarse antes de dormir.",
      },
      courage: {
        label: "Ser valiente",
        description:
          "Una historia sobre confianza y pequeños pasos valientes.",
      },
    },
    morals: {
      friendship: "Amistad",
      bravery: "Valentía",
      sharing: "Compartir",
      confidence: "Confianza",
      family: "Familia",
      creativity: "Creatividad",
    },
    genders: {
      not_specified: "Sin especificar",
      girl: "Niña",
      boy: "Niño",
      diverse: "Diverso",
    },
    summary: {
      title: "Resumen",
      description:
        "Revisa tus datos. Después puedes generar una vista previa ficticia.",
      name: "Nombre",
      age: "Edad",
      ageValue: (age: string) => `${age} años`,
      gender: "Género",
      interests: "Intereses",
      animal: "Animal favorito",
      color: "Color favorito",
      hobby: "Pasatiempo favorito",
      storyType: "Tipo de cuento",
      moral: "Mensaje",
      dedication: "Dedicatoria",
      noDedication: "Sin dedicatoria",
      empty: "-",
    },
    buttons: {
      back: "Atrás",
      next: "Siguiente",
      generate: "Generar vista previa",
      generating: "Generando vista previa...",
      download: "Descargar como PDF más tarde",
    },
    previewBadge: "Vista previa ficticia",
    previewTitle: (name: string) => `${name} y la aventura especial`,
    preview: {
      fallbackStoryType: "aventura",
      fallbackMoral: "valentía",
      dedication: (text: string) =>
        `Antes de que empiece la historia hay una dedicatoria cariñosa: "${text}".`,
      noDedication:
        "La historia comienza sin dedicatoria personal, pero con mucha calidez.",
      body: (
        data: StoryFormValues,
        storyTypeLabel: string,
        moralLabel: string
      ) => `Había una vez un niño llamado ${data.childName}, de ${data.childAge} años, a quien le encantaba el color ${data.favoriteColor} y disfrutaba mucho de ${data.favoriteHobby}. Un día apareció un ${data.favoriteAnimal} con ojos brillantes e invitó a ${data.childName} a una ${storyTypeLabel} muy especial.

En este viaje, ${data.childName} descubrió que ${data.interests} no era solo un interés, sino una verdadera fortaleza. Paso a paso, ${data.childName} aprendió lo importante que es la ${moralLabel}.

Y cuando terminó la aventura, ${data.childName} supo que en cada pequeña idea puede esconderse un gran cuento.`,
    },
  },
} satisfies Record<Language, unknown>;

const createStorySchema = (language: Language) => {
  const validation = copy[language].validation;

  return z.object({
    childName: z
      .string()
      .min(2, validation.childNameMin)
      .max(40, validation.childNameMax),

    childAge: z
      .string()
      .min(1, validation.childAgeRequired)
      .refine((value) => Number(value) >= 1 && Number(value) <= 12, {
        message: validation.childAgeRange,
      }),

    gender: z.enum(["girl", "boy", "diverse", "not_specified"]).optional(),

    interests: z
      .string()
      .min(3, validation.interestsMin)
      .max(220, validation.interestsMax),

    favoriteAnimal: z
      .string()
      .min(2, validation.animalMin)
      .max(40, validation.animalMax),

    favoriteColor: z
      .string()
      .min(2, validation.colorMin)
      .max(40, validation.colorMax),

    favoriteHobby: z
      .string()
      .min(2, validation.hobbyMin)
      .max(60, validation.hobbyMax),

    storyType: z.enum([
      "space_adventure",
      "magical_animals",
      "superhero",
      "birthday",
      "bedtime",
      "courage",
    ]),

    moral: z.enum([
      "friendship",
      "bravery",
      "sharing",
      "confidence",
      "family",
      "creativity",
    ]),

    dedication: z.string().max(300, validation.dedicationMax).optional(),
  });
};

const defaultValues: StoryFormValues = {
  childName: "",
  childAge: "",
  gender: "not_specified",
  interests: "",
  favoriteAnimal: "",
  favoriteColor: "",
  favoriteHobby: "",
  storyType: "space_adventure",
  moral: "friendship",
  dedication: "",
};

const storyTypeIcons: Record<StoryTheme, typeof Rocket> = {
  space_adventure: Rocket,
  magical_animals: Sparkles,
  superhero: ShieldCheck,
  birthday: PartyPopper,
  bedtime: Heart,
  courage: Wand2,
};

const storyTypeValues: StoryTheme[] = [
  "space_adventure",
  "magical_animals",
  "superhero",
  "birthday",
  "bedtime",
  "courage",
];

const moralValues: StoryMoral[] = [
  "friendship",
  "bravery",
  "sharing",
  "confidence",
  "family",
  "creativity",
];

const genderValues: ChildGender[] = [
  "not_specified",
  "girl",
  "boy",
  "diverse",
];

type StoryWizardProps = {
  initialLanguage?: Language;
};

export function StoryWizard({
  initialLanguage = DEFAULT_LANGUAGE,
}: StoryWizardProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [currentStep, setCurrentStep] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [savedData, setSavedData] = useState<StoryFormValues | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  const t = copy[language];
  const storySchema = useMemo(() => createStorySchema(language), [language]);

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    mode: "onChange",
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    formState: { errors },
  } = form;

  const watchedValues = useWatch({ control });
  const values: StoryFormValues = { ...defaultValues, ...watchedValues };

  const progress = useMemo(() => {
    return Math.round((currentStep / t.steps.length) * 100);
  }, [currentStep, t.steps.length]);

  const currentStepData = t.steps[currentStep - 1];

  const storyTypes = storyTypeValues.map((value) => ({
    value,
    icon: storyTypeIcons[value],
    ...t.storyTypes[value],
  }));

  const morals = moralValues.map((value) => ({
    value,
    label: t.morals[value],
  }));

  const genders = genderValues.map((value) => ({
    value,
    label: t.genders[value],
  }));

  async function goNext() {
    const fields = currentStepData.fields;

    const isValid =
      fields.length === 0 ? true : await trigger(fields, { shouldFocus: true });

    if (!isValid) {
      return;
    }

    setPreview(null);
    setCurrentStep((step) => Math.min(step + 1, t.steps.length));
  }

  function goBack() {
    setPreview(null);
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setPreview(null);
  }

  function createFallbackPreview(
    data: StoryFormValues,
    storyTypeLabel: string,
    moralLabel: string
  ) {
    const dedicationText = data.dedication
      ? t.preview.dedication(data.dedication)
      : t.preview.noDedication;

    return `${dedicationText}

${t.preview.body(data, storyTypeLabel, moralLabel)}`;
  }

  async function generatePreview(data: StoryFormValues) {
    setSavedData(data);
    setIsGeneratingPreview(true);

    const storyTypeLabel =
      storyTypes.find((type) => type.value === data.storyType)?.label ??
      t.preview.fallbackStoryType;

    const moralLabel =
      morals.find((moral) => moral.value === data.moral)?.label ??
      t.preview.fallbackMoral;

    try {
      const response = await fetch("/api/story-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          language,
          storyTypeLabel,
          moralLabel,
        }),
      });

      if (!response.ok) {
        throw new Error("Preview request failed.");
      }

      const result = (await response.json()) as { story?: string };
      setPreview(
        result.story?.trim() ||
          createFallbackPreview(data, storyTypeLabel, moralLabel)
      );
    } catch {
      setPreview(createFallbackPreview(data, storyTypeLabel, moralLabel));
    } finally {
      setIsGeneratingPreview(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 text-center">
        <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Globe2 className="h-4 w-4" />
            {t.hero.languageLabel}
          </div>
          <div className="grid w-full max-w-md grid-cols-3 rounded-full border bg-white p-1 shadow-sm sm:w-auto">
            {languageOptions.map((option) => {
              const isSelected = option.value === language;

              return (
                <Button
                  key={option.value}
                  type="button"
                  variant={isSelected ? "default" : "ghost"}
                  className="rounded-full px-3 text-sm"
                  onClick={() => changeLanguage(option.value)}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        <Badge className="rounded-full px-4 py-2">{t.hero.badge}</Badge>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t.hero.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit rounded-3xl border-orange-100 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">{t.stepsTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t.stepCounter(currentStep, t.steps.length)}
            </p>
            <Progress value={progress} className="mt-3" />
          </CardHeader>

          <CardContent className="space-y-3">
            {t.steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div
                  key={step.id}
                  className={[
                    "flex gap-3 rounded-2xl border p-3 transition",
                    isActive
                      ? "border-orange-200 bg-orange-50"
                      : "border-transparent bg-transparent",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                          ? "bg-orange-500 text-white"
                          : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="rounded-3xl bg-white/90 shadow-xl">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                <BookOpen className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle>{currentStepData.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.description}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(generatePreview)} className="space-y-8">
              {currentStep === 1 && (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="childName">{t.labels.childName}</Label>
                    <Input
                      id="childName"
                      placeholder={t.placeholders.childName}
                      {...register("childName")}
                    />
                    {errors.childName && (
                      <p className="text-sm text-red-600">
                        {errors.childName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="childAge">{t.labels.childAge}</Label>
                    <Input
                      id="childAge"
                      type="number"
                      placeholder={t.placeholders.childAge}
                      {...register("childAge")}
                    />
                    {errors.childAge && (
                      <p className="text-sm text-red-600">
                        {errors.childAge.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label>{t.labels.gender}</Label>
                    <RadioGroup
                      value={values.gender}
                      onValueChange={(value) =>
                        setValue("gender", value as ChildGender, {
                          shouldValidate: true,
                        })
                      }
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      {genders.map((gender) => (
                        <Label
                          key={gender.value}
                          htmlFor={`gender-${gender.value}`}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 transition hover:bg-orange-50"
                        >
                          <RadioGroupItem
                            id={`gender-${gender.value}`}
                            value={gender.value}
                          />
                          <span>{gender.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="interests">{t.labels.interests}</Label>
                    <Textarea
                      id="interests"
                      placeholder={t.placeholders.interests}
                      {...register("interests")}
                    />
                    {errors.interests && (
                      <p className="text-sm text-red-600">
                        {errors.interests.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="grid gap-2">
                      <Label htmlFor="favoriteAnimal">
                        {t.labels.favoriteAnimal}
                      </Label>
                      <Input
                        id="favoriteAnimal"
                        placeholder={t.placeholders.favoriteAnimal}
                        {...register("favoriteAnimal")}
                      />
                      {errors.favoriteAnimal && (
                        <p className="text-sm text-red-600">
                          {errors.favoriteAnimal.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="favoriteColor">
                        {t.labels.favoriteColor}
                      </Label>
                      <Input
                        id="favoriteColor"
                        placeholder={t.placeholders.favoriteColor}
                        {...register("favoriteColor")}
                      />
                      {errors.favoriteColor && (
                        <p className="text-sm text-red-600">
                          {errors.favoriteColor.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="favoriteHobby">
                        {t.labels.favoriteHobby}
                      </Label>
                      <Input
                        id="favoriteHobby"
                        placeholder={t.placeholders.favoriteHobby}
                        {...register("favoriteHobby")}
                      />
                      {errors.favoriteHobby && (
                        <p className="text-sm text-red-600">
                          {errors.favoriteHobby.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid gap-4">
                  <RadioGroup
                    value={values.storyType}
                    onValueChange={(value) =>
                      setValue("storyType", value as StoryTheme, {
                        shouldValidate: true,
                      })
                    }
                    className="grid gap-4 md:grid-cols-2"
                  >
                    {storyTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = values.storyType === type.value;

                      return (
                        <Label
                          key={type.value}
                          htmlFor={`type-${type.value}`}
                          className={[
                            "cursor-pointer rounded-3xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md",
                            isSelected
                              ? "border-orange-400 bg-orange-50 shadow-sm"
                              : "border-border",
                          ].join(" ")}
                        >
                          <div className="flex items-start gap-4">
                            <RadioGroupItem
                              id={`type-${type.value}`}
                              value={type.value}
                              className="mt-1"
                            />
                            <div>
                              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                                <Icon className="h-5 w-5 text-blue-600" />
                              </div>
                              <p className="font-bold">{type.label}</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        </Label>
                      );
                    })}
                  </RadioGroup>

                  {errors.storyType && (
                    <p className="text-sm text-red-600">
                      {errors.storyType.message}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="grid gap-4">
                  <RadioGroup
                    value={values.moral}
                    onValueChange={(value) =>
                      setValue("moral", value as StoryMoral, {
                        shouldValidate: true,
                      })
                    }
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
                  >
                    {morals.map((moral) => {
                      const isSelected = values.moral === moral.value;

                      return (
                        <Label
                          key={moral.value}
                          htmlFor={`moral-${moral.value}`}
                          className={[
                            "cursor-pointer rounded-3xl border bg-white p-5 text-center transition hover:-translate-y-0.5 hover:shadow-md",
                            isSelected
                              ? "border-orange-400 bg-orange-50 shadow-sm"
                              : "border-border",
                          ].join(" ")}
                        >
                          <RadioGroupItem
                            id={`moral-${moral.value}`}
                            value={moral.value}
                            className="sr-only"
                          />
                          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                            <Heart className="h-5 w-5 text-orange-600" />
                          </div>
                          <p className="font-bold">{moral.label}</p>
                        </Label>
                      );
                    })}
                  </RadioGroup>

                  {errors.moral && (
                    <p className="text-sm text-red-600">
                      {errors.moral.message}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="grid gap-2">
                  <Label htmlFor="dedication">{t.labels.dedication}</Label>
                  <Textarea
                    id="dedication"
                    rows={7}
                    placeholder={t.placeholders.dedication}
                    {...register("dedication")}
                  />
                  <p className="text-sm text-muted-foreground">
                    {t.helperText}
                  </p>
                  {errors.dedication && (
                    <p className="text-sm text-red-600">
                      {errors.dedication.message}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="rounded-3xl border bg-orange-50/60 p-5">
                    <div className="flex items-center gap-3">
                      <Baby className="h-5 w-5 text-orange-600" />
                      <h3 className="font-bold">{t.summary.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t.summary.description}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <SummaryItem label={t.summary.name} value={values.childName} />
                    <SummaryItem
                      label={t.summary.age}
                      value={t.summary.ageValue(values.childAge)}
                    />
                    <SummaryItem
                      label={t.summary.gender}
                      value={t.genders[values.gender ?? "not_specified"]}
                    />
                    <SummaryItem
                      label={t.summary.interests}
                      value={values.interests}
                    />
                    <SummaryItem
                      label={t.summary.animal}
                      value={values.favoriteAnimal}
                    />
                    <SummaryItem
                      label={t.summary.color}
                      value={values.favoriteColor}
                    />
                    <SummaryItem
                      label={t.summary.hobby}
                      value={values.favoriteHobby}
                    />
                    <SummaryItem
                      label={t.summary.storyType}
                      value={
                        storyTypes.find(
                          (type) => type.value === values.storyType
                        )?.label ?? t.summary.empty
                      }
                    />
                    <SummaryItem
                      label={t.summary.moral}
                      value={
                        morals.find((moral) => moral.value === values.moral)
                          ?.label ?? t.summary.empty
                      }
                    />
                    <SummaryItem
                      label={t.summary.dedication}
                      value={values.dedication || t.summary.noDedication}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={currentStep === 1}
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.buttons.back}
                </Button>

                {currentStep < t.steps.length ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    className="rounded-full"
                  >
                    {t.buttons.next}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isGeneratingPreview}
                    className="rounded-full"
                  >
                    {isGeneratingPreview
                      ? t.buttons.generating
                      : t.buttons.generate}
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {preview && savedData && (
        <Card className="mt-10 rounded-3xl border-orange-200 bg-white shadow-xl">
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge className="rounded-full">{t.previewBadge}</Badge>
                <CardTitle className="mt-3 text-3xl">
                  {t.previewTitle(savedData.childName)}
                </CardTitle>
              </div>

              <Button variant="outline" className="rounded-full">
                {t.buttons.download}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-3xl bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 p-6 leading-8 text-slate-700">
              {preview.split("\n").map((paragraph, index) =>
                paragraph.trim() ? (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-medium text-slate-900">{value || "-"}</p>
    </div>
  );
}
