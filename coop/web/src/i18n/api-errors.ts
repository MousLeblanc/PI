import type { TranslateFn } from "@/i18n/translate";

const API_ERROR_KEYS: Record<string, string> = {
  "Échec de la vérification anti-bot": "register.errors.turnstile",
  "Un compte existe déjà avec cet email": "register.errors.emailTaken",
  "Code postal belge à 4 chiffres": "register.errors.postal",
  "Code postal invalide": "register.errors.postal",
  "Le nombre de tranches d’âge doit égaler la taille du ménage":
    "register.errors.household",
  "Trop de tentatives. Réessayez dans quelques minutes.":
    "register.errors.rateLimit",
  "Le nombre de tranches d'âge doit égaler la taille du ménage":
    "register.errors.household",
  "Inscription impossible": "register.errors.impossible",
  "postalCode et streetName requis": "register.errors.postal",
};

export function translateApiError(message: string, t: TranslateFn): string {
  const key = API_ERROR_KEYS[message];
  if (key) return t(key);
  return t("register.errors.generic");
}
