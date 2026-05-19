"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  CreditCard,
  Heart,
  LucideIcon,
  PartyPopper,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";

import type {
  ChildGender,
  ChildProfile,
  StoryCreationInput,
  StoryMoral,
  StoryTheme,
} from "@/types/story";

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

type MockStoryPreview = {
  title: string;
  shortDescription: string;
  previewText: string;
};

const storySchema = z.object({
  childName: z
    .string()
    .min(2, "Bitte gib mindestens 2 Zeichen ein.")
    .max(40, "Der Name darf maximal 40 Zeichen lang sein."),
  childAge: z
    .string()
    .min(1, "Bitte gib das Alter ein.")
    .refine((value) => Number(value) >= 1 && Number(value) <= 12, {
      message: "Das Alter sollte zwischen 1 und 12 Jahren liegen.",
    }),
  gender: z.enum(["girl", "boy", "diverse", "not_specified"]),
  interests: z
    .string()
    .min(3, "Bitte beschreibe mindestens ein Interesse.")
    .max(220, "Bitte halte die Interessen etwas kürzer."),
  favoriteAnimal: z
    .string()
    .min(2, "Bitte gib ein Lieblingstier ein.")
    .max(40, "Bitte halte das Lieblingstier kürzer."),
  favoriteColor: z
    .string()
    .min(2, "Bitte gib eine Lieblingsfarbe ein.")
    .max(40, "Bitte halte die Farbe kürzer."),
  favoriteHobby: z
    .string()
    .min(2, "Bitte gib ein Lieblingshobby ein.")
    .max(60, "Bitte halte das Hobby kürzer."),
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
  dedication: z
    .string()
    .max(300, "Die Widmung darf maximal 300 Zeichen lang sein.")
    .optional(),
});

type StoryFormValues = z.infer<typeof storySchema>;

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

const steps = [
  {
    id: 1,
    title: "Daten des Kindes",
    description: "Name, Alter und optionale Angaben",
    fields: ["childName", "childAge", "gender"] as const,
  },
  {
    id: 2,
    title: "Persönlichkeit & Interessen",
    description: "Was macht das Kind besonders?",
    fields: [
      "interests",
      "favoriteAnimal",
      "favoriteColor",
      "favoriteHobby",
    ] as const,
  },
  {
    id: 3,
    title: "Art des Märchens",
    description: "Wähle die Welt der Geschichte",
    fields: ["storyType"] as const,
  },
  {
    id: 4,
    title: "Botschaft des Märchens",
    description: "Welche Moral soll die Geschichte vermitteln?",
    fields: ["moral"] as const,
  },
  {
    id: 5,
    title: "Widmung",
    description: "Eine persönliche Nachricht hinzufügen",
    fields: ["dedication"] as const,
  },
  {
    id: 6,
    title: "Zusammenfassung",
    description: "Prüfe alle Angaben vor der Vorschau",
    fields: [] as const,
  },
];

const storyTypes: {
  value: StoryTheme;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "space_adventure",
    label: "Weltraumabenteuer",
    description: "Planeten, Sterne und eine große Reise durch das Universum.",
    icon: Rocket,
  },
  {
    value: "magical_animals",
    label: "Magische Tiere",
    description: "Sprechende Tiere, ein verzauberter Wald und kleine Wunder.",
    icon: Sparkles,
  },
  {
    value: "superhero",
    label: "Superheld",
    description: "Das Kind entdeckt besondere Kräfte und hilft anderen.",
    icon: ShieldCheck,
  },
  {
    value: "birthday",
    label: "Geburtstag",
    description: "Ein besonderer Tag voller Überraschungen und Freude.",
    icon: PartyPopper,
  },
  {
    value: "bedtime",
    label: "Ruhig einschlafen",
    description: "Eine sanfte Geschichte zum Entspannen vor dem Schlafen.",
    icon: Heart,
  },
  {
    value: "courage",
    label: "Mutig werden",
    description: "Eine Geschichte über Selbstvertrauen und kleine mutige Schritte.",
    icon: Wand2,
  },
];

const morals: {
  value: StoryMoral;
  label: string;
  storyWord: string;
}[] = [
  {
    value: "friendship",
    label: "Freundschaft",
    storyWord: "wahre Freundschaft",
  },
  {
    value: "bravery",
    label: "Mut",
    storyWord: "Mut",
  },
  {
    value: "sharing",
    label: "Teilen",
    storyWord: "Teilen",
  },
  {
    value: "confidence",
    label: "Vertrauen",
    storyWord: "Vertrauen",
  },
  {
    value: "family",
    label: "Familie",
    storyWord: "Familie",
  },
  {
    value: "creativity",
    label: "Kreativität",
    storyWord: "Kreativität",
  },
];

const genders: {
  value: ChildGender;
  label: string;
}[] = [
  {
    value: "not_specified",
    label: "Keine Angabe",
  },
  {
    value: "girl",
    label: "Mädchen",
  },
  {
    value: "boy",
    label: "Junge",
  },
  {
    value: "diverse",
    label: "Divers",
  },
];

function getThemeLabel(theme: StoryTheme) {
  return storyTypes.find((type) => type.value === theme)?.label ?? "Abenteuer";
}

function getMoralLabel(moral: StoryMoral) {
  return morals.find((item) => item.value === moral)?.label ?? "Mut";
}

function getMoralStoryWord(moral: StoryMoral) {
  return morals.find((item) => item.value === moral)?.storyWord ?? "Mut";
}

function generateMockStoryPreview(data: StoryCreationInput): MockStoryPreview {
  const childName = data.child.name;
  const childAge = data.child.age;
  const interests = data.child.interests;
  const favoriteAnimal = data.child.favoriteAnimal;
  const favoriteColor = data.child.favoriteColor;
  const favoriteHobby = data.child.favoriteHobby;
  const themeLabel = getThemeLabel(data.theme);
  const moralLabel = getMoralLabel(data.moral);
  const moralStoryWord = getMoralStoryWord(data.moral);

  const themeOpenings: Record<StoryTheme, string> = {
    space_adventure: `${childName} hatte schon immer davon geträumt, weiter als bis zu den Sternen zu reisen. Eines Abends, während ${childName} aus dem Fenster schaute, landete leise eine kleine Raumkapsel im Garten.`,
    magical_animals: `${childName} hörte eines Morgens ein leises Flüstern hinter den Bäumen. Als ${childName} näherkam, stand dort ein magisches ${favoriteAnimal}, dessen Augen wie kleine Sterne funkelten.`,
    superhero: `${childName} bemerkte an einem ganz gewöhnlichen Tag, dass etwas Besonderes geschah. Immer wenn jemand Hilfe brauchte, begann ein kleines Licht in ${favoriteColor} zu leuchten.`,
    birthday: `An ${childName}s besonderem Tag war die Luft voller Vorfreude. Doch als plötzlich ein geheimnisvoller Brief auf dem Geburtstagstisch lag, begann ein Abenteuer, das niemand erwartet hatte.`,
    bedtime: `Als der Abend ruhig wurde und die Sterne langsam am Himmel erschienen, kuschelte sich ${childName} gemütlich ein. Da öffnete sich im Traum eine sanfte Tür zu einem friedlichen Wunderland.`,
    courage: `${childName} stand vor einer kleinen Herausforderung, die sich zuerst riesengroß anfühlte. Doch tief im Herzen spürte ${childName}, dass irgendwo ein mutiger Funke wartete.`,
  };

  const themeTitles: Record<StoryTheme, string> = {
    space_adventure: `${childName} und die Reise zu den Sternen`,
    magical_animals: `${childName} und das magische ${favoriteAnimal}`,
    superhero: `${childName} und das geheime Superlicht`,
    birthday: `${childName} und der wundersame Geburtstag`,
    bedtime: `${childName} und der Traum aus Sternenstaub`,
    courage: `${childName} und der kleine große Mut`,
  };

  const dedicationText = data.dedication
    ? `Vor dem ersten Kapitel steht eine liebevolle Widmung: „${data.dedication}”.`
    : `Diese Geschichte beginnt ohne Widmung, aber mit einem Herzen voller Wärme.`;

  const shortDescription = `Ein personalisiertes ${themeLabel} für ${childName}, ${childAge} Jahre alt. Die Geschichte verbindet ${interests}, ${favoriteHobby} und die Botschaft ${moralLabel}.`;

  const previewText = `${dedicationText}

${themeOpenings[data.theme]}

${childName} nahm allen Mut zusammen und folgte dem geheimnisvollen Zeichen. Schon bald zeigte sich, dass ${interests} nicht einfach nur ein Interesse war, sondern eine besondere Stärke. Mit jedem Schritt wurde die Welt größer, bunter und überraschender.

Auf dem Weg begegnete ${childName} einem freundlichen ${favoriteAnimal}, das eine wichtige Aufgabe hatte. Gemeinsam mussten sie ein Rätsel lösen, bei dem ${favoriteHobby}, Fantasie und ein bisschen Geduld halfen.

Am Ende verstand ${childName}, dass ${moralStoryWord} nicht nur ein Wort ist, sondern etwas, das man fühlen, zeigen und weitergeben kann. Und genau in diesem Moment begann das eigentliche Abenteuer erst richtig...`;

  return {
    title: themeTitles[data.theme],
    shortDescription,
    previewText,
  };
}

export function StoryWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [preview, setPreview] = useState<MockStoryPreview | null>(null);
  const [savedData, setSavedData] = useState<StoryCreationInput | null>(null);

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    mode: "onChange",
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const values = watch();

  const progress = useMemo(() => {
    return Math.round((currentStep / steps.length) * 100);
  }, [currentStep]);

  const currentStepData = steps[currentStep - 1];

  async function goNext() {
    const fields = currentStepData.fields;

    const isValid =
      fields.length === 0 ? true : await trigger(fields, { shouldFocus: true });

    if (!isValid) {
      return;
    }

    setPreview(null);
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  }

  function goBack() {
    setPreview(null);
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function buildStoryInput(data: StoryFormValues): StoryCreationInput {
    const child: ChildProfile = {
      name: data.childName,
      age: Number(data.childAge),
      gender: data.gender,
      interests: data.interests,
      favoriteAnimal: data.favoriteAnimal,
      favoriteColor: data.favoriteColor,
      favoriteHobby: data.favoriteHobby,
    };

    return {
      child,
      theme: data.storyType,
      moral: data.moral,
      dedication: data.dedication,
    };
  }

  function handleGeneratePreview(data: StoryFormValues) {
    const storyInput = buildStoryInput(data);
    const mockPreview = generateMockStoryPreview(storyInput);

    setSavedData(storyInput);
    setPreview(mockPreview);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 text-center">
        <Badge className="rounded-full px-4 py-2">Märchen-Assistent</Badge>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
          Erstelle ein persönliches Märchen
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Beantworte ein paar einfache Fragen. Danach zeigen wir dir eine erste
          fiktive Vorschau deiner Geschichte.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit rounded-3xl border-orange-100 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Schritte</CardTitle>
            <p className="text-sm text-muted-foreground">
              Schritt {currentStep} von {steps.length}
            </p>
            <Progress value={progress} className="mt-3" />
          </CardHeader>

          <CardContent className="space-y-3">
            {steps.map((step) => {
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
            <form
              onSubmit={handleSubmit(handleGeneratePreview)}
              className="space-y-8"
            >
              {currentStep === 1 && (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="childName">Name des Kindes</Label>
                    <Input
                      id="childName"
                      placeholder="Zum Beispiel: Emma, Leo, Mateo"
                      {...register("childName")}
                    />
                    {errors.childName && (
                      <p className="text-sm text-red-600">
                        {errors.childName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="childAge">Alter</Label>
                    <Input
                      id="childAge"
                      type="number"
                      placeholder="Zum Beispiel: 6"
                      {...register("childAge")}
                    />
                    {errors.childAge && (
                      <p className="text-sm text-red-600">
                        {errors.childAge.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label>Geschlecht optional</Label>
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
                    <Label htmlFor="interests">Interessen des Kindes</Label>
                    <Textarea
                      id="interests"
                      placeholder="Zum Beispiel: Dinosaurier, Malen, Fußball, Sterne, Musik..."
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
                      <Label htmlFor="favoriteAnimal">Lieblingstier</Label>
                      <Input
                        id="favoriteAnimal"
                        placeholder="Zum Beispiel: Fuchs"
                        {...register("favoriteAnimal")}
                      />
                      {errors.favoriteAnimal && (
                        <p className="text-sm text-red-600">
                          {errors.favoriteAnimal.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="favoriteColor">Lieblingsfarbe</Label>
                      <Input
                        id="favoriteColor"
                        placeholder="Zum Beispiel: Blau"
                        {...register("favoriteColor")}
                      />
                      {errors.favoriteColor && (
                        <p className="text-sm text-red-600">
                          {errors.favoriteColor.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="favoriteHobby">Lieblingshobby</Label>
                      <Input
                        id="favoriteHobby"
                        placeholder="Zum Beispiel: Zeichnen"
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
                  <Label htmlFor="dedication">
                    Persönliche Widmung optional
                  </Label>
                  <Textarea
                    id="dedication"
                    rows={7}
                    placeholder="Zum Beispiel: Für meinen kleinen Abenteurer. Mögest du immer an deine Fantasie glauben."
                    {...register("dedication")}
                  />
                  <p className="text-sm text-muted-foreground">
                    Du kannst dieses Feld auch leer lassen.
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
                      <h3 className="font-bold">Zusammenfassung</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Bitte prüfe deine Angaben. Danach kannst du eine fiktive
                      Vorschau generieren.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <SummaryItem label="Name" value={values.childName} />
                    <SummaryItem
                      label="Alter"
                      value={`${values.childAge} Jahre`}
                    />
                    <SummaryItem
                      label="Geschlecht"
                      value={
                        genders.find((gender) => gender.value === values.gender)
                          ?.label ?? "Keine Angabe"
                      }
                    />
                    <SummaryItem label="Interessen" value={values.interests} />
                    <SummaryItem
                      label="Lieblingstier"
                      value={values.favoriteAnimal}
                    />
                    <SummaryItem
                      label="Lieblingsfarbe"
                      value={values.favoriteColor}
                    />
                    <SummaryItem
                      label="Lieblingshobby"
                      value={values.favoriteHobby}
                    />
                    <SummaryItem
                      label="Art des Märchens"
                      value={getThemeLabel(values.storyType)}
                    />
                    <SummaryItem
                      label="Botschaft"
                      value={getMoralLabel(values.moral)}
                    />
                    <SummaryItem
                      label="Widmung"
                      value={values.dedication || "Keine Widmung"}
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
                  Zurück
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    className="rounded-full"
                  >
                    Weiter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="rounded-full">
                    Vorschau generieren
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {preview && savedData && (
        <Card className="mt-10 overflow-hidden rounded-3xl border-orange-200 bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-orange-100 via-pink-100 to-blue-100 p-1">
            <div className="rounded-[1.35rem] bg-white/90">
              <CardHeader>
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <Badge className="rounded-full">Fiktive Vorschau</Badge>

                    <CardTitle className="mt-4 text-3xl md:text-4xl">
                      {preview.title}
                    </CardTitle>

                    <p className="mt-3 max-w-2xl text-muted-foreground">
                      {preview.shortDescription}
                    </p>
                  </div>

                  <Button className="rounded-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Continuar al pago
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="rounded-3xl border bg-gradient-to-br from-orange-50 via-white to-blue-50 p-6 leading-8 text-slate-700">
                  {preview.previewText.split("\n").map((paragraph, index) =>
                    paragraph.trim() ? (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ) : null
                  )}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-orange-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Kind
                    </p>
                    <p className="mt-1 font-bold">{savedData.child.name}</p>
                  </div>

                  <div className="rounded-2xl bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Thema
                    </p>
                    <p className="mt-1 font-bold">
                      {getThemeLabel(savedData.theme)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-pink-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Botschaft
                    </p>
                    <p className="mt-1 font-bold">
                      {getMoralLabel(savedData.moral)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
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