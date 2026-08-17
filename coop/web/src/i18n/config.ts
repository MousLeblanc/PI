export const LOCALES = ["fr", "nl", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";
export const COOKIE_NAME = "pi_locale";

export const NUMBER_LOCALES: Record<Locale, string> = {
  fr: "fr-BE",
  nl: "nl-BE",
  en: "en-GB",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "fr" || value === "nl" || value === "en";
}

export function localeFromAcceptLanguage(
  header: string | null | undefined,
): Locale {
  if (!header) return DEFAULT_LOCALE;

  const tags = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number(q.split("=")[1]) : 1;
      return {
        tag: tag.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of tags) {
    if (tag.startsWith("nl")) return "nl";
    if (tag.startsWith("en")) return "en";
    if (tag.startsWith("fr")) return "fr";
  }

  return DEFAULT_LOCALE;
}
