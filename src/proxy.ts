import { NextResponse, type NextRequest } from "next/server";

import {
  getLanguage,
  isLanguage,
  LANGUAGE_COOKIE,
} from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("lang");

  if (!language) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.searchParams.delete("lang");

  const response = NextResponse.redirect(url);

  if (isLanguage(language)) {
    response.cookies.set(LANGUAGE_COOKIE, getLanguage(language), {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: "/((?!_next|.*\\..*).*)",
};
