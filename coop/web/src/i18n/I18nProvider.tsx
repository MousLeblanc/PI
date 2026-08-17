"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { NUMBER_LOCALES, type Locale } from "./config";
import { getMessages, type Messages } from "./messages";
import { setLocaleCookie } from "./actions";
import { translate, type TranslateFn } from "./translate";

export type { TranslateFn };

type I18nValue = {
  locale: Locale;
  messages: Messages;
  numberLocale: string;
  t: TranslateFn;
  setLocale: (locale: Locale) => void;
};

export const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const [optimistic, setOptimistic] = useState<Locale | null>(null);
  const current = optimistic ?? locale;

  useEffect(() => {
    setOptimistic(null);
  }, [locale]);

  const messages = getMessages(current);

  const t = useMemo<TranslateFn>(
    () => (key, vars) => translate(messages, key, vars),
    [messages],
  );

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === current) return;
      setOptimistic(next);
      document.documentElement.lang = next;
      void setLocaleCookie(next).then(() => router.refresh());
    },
    [current, router],
  );

  const value = useMemo<I18nValue>(
    () => ({
      locale: current,
      messages,
      numberLocale: NUMBER_LOCALES[current],
      t,
      setLocale,
    }),
    [current, messages, t, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
