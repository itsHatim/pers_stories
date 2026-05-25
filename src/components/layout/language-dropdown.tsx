"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  LANGUAGE_OPTIONS,
  type Language,
  siteCopy,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageDropdownProps = {
  currentLanguage: Language;
};

export function LanguageDropdown({
  currentLanguage,
}: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOption =
    LANGUAGE_OPTIONS.find((option) => option.value === currentLanguage) ??
    LANGUAGE_OPTIONS[0];
  const label = siteCopy[currentLanguage].language.label;

  function changeLanguage(nextLanguage: Language) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLanguage);
    setOpen(false);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();
    });
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full px-2.5"
      >
        <Languages className="h-4 w-4" />
        <span className="text-xs font-bold">{currentOption.shortLabel}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </Button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl border bg-white p-1 shadow-lg"
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const isSelected = option.value === currentLanguage;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                disabled={isPending}
                onClick={() => changeLanguage(option.value)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted disabled:opacity-60",
                  isSelected && "bg-orange-50 text-orange-700"
                )}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[11px] font-bold">
                  {option.shortLabel}
                </span>
                <span className="flex-1">{option.label}</span>
                {isSelected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
