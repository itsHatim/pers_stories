import { cookies } from "next/headers";

import { getLanguage, LANGUAGE_COOKIE } from "@/lib/i18n";

export async function getCurrentLanguage() {
  return getLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value);
}
