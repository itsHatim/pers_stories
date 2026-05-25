import { StoryWizard } from "@/components/story-builder/story-wizard";
import { getCurrentLanguage } from "@/lib/i18n-server";

export default async function CreateStoryPage() {
  const language = await getCurrentLanguage();

  return (
    <section className="px-4 py-16">
      <StoryWizard initialLanguage={language} />
    </section>
  );
}
