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
  gender: z.string().optional(),
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
  storyType: z.string().min(1, "Bitte wähle eine Art von Märchen aus."),
  moral: z.string().min(1, "Bitte wähle eine Botschaft aus."),
  dedication: z
    .string()
    .max(300, "Die Widmung darf maximal 300 Zeichen lang sein.")
    .optional(),
});

type StoryFormValues = z.infer<typeof storySchema>;

const defaultValues: StoryFormValues = {
  childName: "",
  childAge: "",
  gender: "",
  interests: "",
  favoriteAnimal: "",
  favoriteColor: "",
  favoriteHobby: "",
  storyType: "",
  moral: "",
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

const storyTypes = [
  {
    value: "Aventura espacial",
    label: "Weltraumabenteuer",
    description: "Planeten, Sterne und eine große Reise durch das Universum.",
    icon: Rocket,
  },
  {
    value: "Animales mágicos",
    label: "Magische Tiere",
    description: "Sprechende Tiere, ein verzauberter Wald und kleine Wunder.",
    icon: Sparkles,
  },
  {
    value: "Superhéroe",
    label: "Superheld",
    description: "Das Kind entdeckt besondere Kräfte und hilft anderen.",
    icon: ShieldCheck,
  },
  {
    value: "Cumpleaños",
    label: "Geburtstag",
    description: "Ein besonderer Tag voller Überraschungen und Freude.",
    icon: PartyPopper,
  },
  {
    value: "Dormir tranquilo",
    label: "Ruhig einschlafen",
    description: "Eine sanfte Geschichte zum Entspannen vor dem Schlafen.",
    icon: Heart,
  },
  {
    value: "Aprender a ser valiente",
    label: "Mutig werden",
    description: "Eine Geschichte über Selbstvertrauen und kleine mutige Schritte.",
    icon: Wand2,
  },
];

const morals = [
  {
    value: "Amistad",
    label: "Freundschaft",
  },
  {
    value: "Valentía",
    label: "Mut",
  },
  {
    value: "Compartir",
    label: "Teilen",
  },
  {
    value: "Confianza",
    label: "Vertrauen",
  },
  {
    value: "Familia",
    label: "Familie",
  },
  {
    value: "Creatividad",
    label: "Kreativität",
  },
];

const genders = [
  {
    value: "",
    label: "Keine Angabe",
  },
  {
    value: "Mädchen",
    label: "Mädchen",
  },
  {
    value: "Junge",
    label: "Junge",
  },
  {
    value: "Divers",
    label: "Divers",
  },
];

export function StoryWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [savedData, setSavedData] = useState<StoryFormValues | null>(null);

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

  function generatePreview(data: StoryFormValues) {
    setSavedData(data);

    const storyTypeLabel =
      storyTypes.find((type) => type.value === data.storyType)?.label ??
      "Abenteuer";

    const moralLabel =
      morals.find((moral) => moral.value === data.moral)?.label ?? "Mut";

    const dedicationText = data.dedication
      ? `Vor der Geschichte steht eine liebevolle Widmung: „${data.dedication}”.`
      : "Die Geschichte beginnt ohne persönliche Widmung, aber mit viel Wärme.";

    setPreview(
      `${dedicationText}

Es war einmal ein Kind namens ${data.childName}, ${data.childAge} Jahre alt, das ${data.favoriteColor} liebte und am liebsten ${data.favoriteHobby} machte. Eines Tages erschien ein ${data.favoriteAnimal} mit funkelnden Augen und lud ${data.childName} zu einem besonderen ${storyTypeLabel} ein.

Auf dieser Reise entdeckte ${data.childName}, dass ${data.interests} nicht nur ein Interesse war, sondern eine echte Stärke. Schritt für Schritt lernte ${data.childName}, wie wichtig ${moralLabel} ist.

Und als das Abenteuer endete, wusste ${data.childName}: In jeder kleinen Idee kann ein großes Märchen stecken.`
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 text-center">
        <Badge className="rounded-full px-4 py-2">
          Märchen-Assistent
        </Badge>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
          Erstelle ein persönliches Märchen
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Beantworte ein paar einfache Fragen. Danach zeigen wir dir eine
          erste fiktive Vorschau deiner Geschichte.
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
            <form onSubmit={handleSubmit(generatePreview)} className="space-y-8">
              {currentStep === 1 && (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="childName">Name des Kindes</Label>
                    <Input
                      id="childName"
                      placeholder="Zum Beispiel: Emma, Leo, Mia"
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
                        setValue("gender", value, { shouldValidate: true })
                      }
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      {genders.map((gender) => (
                        <Label
                          key={gender.label}
                          htmlFor={`gender-${gender.label}`}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 transition hover:bg-orange-50"
                        >
                          <RadioGroupItem
                            id={`gender-${gender.label}`}
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
                      setValue("storyType", value, { shouldValidate: true })
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
                      setValue("moral", value, { shouldValidate: true })
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
                  <Label htmlFor="dedication">Persönliche Widmung optional</Label>
                  <Textarea
                    id="dedication"
                    rows={7}
                    placeholder="Zum Beispiel: Für meine kleine Abenteurerin Emma. Mögest du immer an deine Fantasie glauben."
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
                    <SummaryItem label="Alter" value={`${values.childAge} Jahre`} />
                    <SummaryItem
                      label="Geschlecht"
                      value={values.gender || "Keine Angabe"}
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
                      value={
                        storyTypes.find(
                          (type) => type.value === values.storyType
                        )?.label ?? "-"
                      }
                    />
                    <SummaryItem
                      label="Botschaft"
                      value={
                        morals.find((moral) => moral.value === values.moral)
                          ?.label ?? "-"
                      }
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
        <Card className="mt-10 rounded-3xl border-orange-200 bg-white shadow-xl">
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge className="rounded-full">Fiktive Vorschau</Badge>
                <CardTitle className="mt-3 text-3xl">
                  {savedData.childName} und das besondere Abenteuer
                </CardTitle>
              </div>

              <Button variant="outline" className="rounded-full">
                Später als PDF herunterladen
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