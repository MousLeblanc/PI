import { cookies, headers } from "next/headers";
import {
  COOKIE_NAME,
  isLocale,
  localeFromAcceptLanguage,
  type Locale,
} from "./config";

export async function resolveLocale(): Promise<Locale> {
  const jar = await cookies();
  const fromCookie = jar.get(COOKIE_NAME)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language");
  return localeFromAcceptLanguage(accept);
}
