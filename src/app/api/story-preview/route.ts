import { NextResponse } from "next/server";
import { z } from "zod";

import { SUPPORTED_LANGUAGES } from "@/lib/i18n";

const storyPreviewSchema = z.object({
  language: z.enum(SUPPORTED_LANGUAGES),
  childName: z.string().min(2).max(40),
  childAge: z.string().min(1).max(2),
  gender: z.enum(["girl", "boy", "diverse", "not_specified"]).optional(),
  interests: z.string().min(3).max(220),
  favoriteAnimal: z.string().min(2).max(40),
  favoriteColor: z.string().min(2).max(40),
  favoriteHobby: z.string().min(2).max(60),
  storyType: z.string().min(2).max(80),
  storyTypeLabel: z.string().min(2).max(80),
  moral: z.string().min(2).max(80),
  moralLabel: z.string().min(2).max(80),
  dedication: z.string().max(300).optional(),
});

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  error?: {
    message?: string;
  };
};

const languageNames = {
  en: "English",
  de: "German",
  es: "Spanish",
};

const instructions = `You create warm, age-appropriate fictional children's stories from personalization details.

Rules:
- Write only the story text, no markdown and no explanations.
- Keep it suitable for children ages 1 to 12.
- Use gentle, imaginative language and a hopeful ending.
- Include the child's name naturally several times.
- Reflect the selected theme, moral, favorite animal, favorite color, hobby, and interests.
- If a dedication is provided, weave it in as a short opening dedication before the story.
- Avoid scary, violent, medical, political, religious, or adult content.
- Create a complete short story with a beginning, middle, and ending.
- Keep it around 700 to 1000 words.`;

function extractText(response: OpenAIResponse) {
  if (response.output_text) {
    return response.output_text.trim();
  }

  return (
    response.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text)
      .filter(Boolean)
      .join("\n")
      .trim() ?? ""
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 503 }
    );
  }

  const parsed = storyPreviewSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid story details." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

  const input = `Write the preview in ${languageNames[data.language]}.

Story details:
- Child name: ${data.childName}
- Child age: ${data.childAge}
- Gender: ${data.gender ?? "not specified"}
- Interests: ${data.interests}
- Favorite animal: ${data.favoriteAnimal}
- Favorite color: ${data.favoriteColor}
- Favorite hobby: ${data.favoriteHobby}
- Story theme: ${data.storyTypeLabel} (${data.storyType})
- Story moral/message: ${data.moralLabel} (${data.moral})
- Dedication: ${data.dedication?.trim() || "none"}`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      instructions,
      input,
      max_output_tokens: 1800,
    }),
  });

  const result = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    return NextResponse.json(
      { error: result.error?.message ?? "Story preview generation failed." },
      { status: response.status }
    );
  }

  const story = extractText(result);

  if (!story) {
    return NextResponse.json(
      { error: "The model returned an empty story preview." },
      { status: 502 }
    );
  }

  return NextResponse.json({ story });
}
