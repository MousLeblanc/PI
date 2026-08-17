import type { Locale } from "../config";
import { en } from "./en";
import { fr, type Messages } from "./fr";
import { nl } from "./nl";

export type { Messages };

const dictionaries: Record<Locale, Messages> = { fr, nl, en };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
