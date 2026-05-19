export type StoryLanguage = "de";

export type StoryStatus = "draft" | "preview" | "paid" | "completed";

export type Story = {
  id: string;
  title: string;
  childName: string;
  childAge: number;
  language: StoryLanguage;
  theme: string;
  status: StoryStatus;
  createdAt: string;
};
