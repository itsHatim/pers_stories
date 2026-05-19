export type ChildGender = "girl" | "boy" | "diverse" | "not_specified";

export type ChildProfile = {
  name: string;
  age: number;
  gender?: ChildGender;
  interests: string;
  favoriteAnimal: string;
  favoriteColor: string;
  favoriteHobby: string;
};

export type StoryTheme =
  | "space_adventure"
  | "magical_animals"
  | "superhero"
  | "birthday"
  | "bedtime"
  | "courage";

export type StoryMoral =
  | "friendship"
  | "bravery"
  | "sharing"
  | "confidence"
  | "family"
  | "creativity";

export type StoryStatus =
  | "draft"
  | "preview_generated"
  | "paid"
  | "generating"
  | "ready"
  | "failed";

export type Story = {
  id: string;
  userId: string;
  child: ChildProfile;
  theme: StoryTheme;
  moral: StoryMoral;
  dedication?: string | null;
  title?: string | null;
  previewText?: string | null;
  fullText?: string | null;
  status: StoryStatus;
  pdfUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StoryPage = {
  id: string;
  storyId: string;
  pageNumber: number;
  text: string;
  imagePrompt?: string | null;
  imageUrl?: string | null;
};

export type StoryCreationInput = {
  child: ChildProfile;
  theme: StoryTheme;
  moral: StoryMoral;
  dedication?: string;
};
