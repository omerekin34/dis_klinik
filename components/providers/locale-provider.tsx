"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/content";
import { en, tr, type Dictionary } from "@/lib/i18n/dictionary";

const STORAGE_KEY = "aureum.locale";
const CHANGE_EVENT = "aureum-locale";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function getSnapshot(): Locale {
  return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "tr";
}

function getServerSnapshot(): Locale {
  return "tr";
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (next) => {
        localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
        window.dispatchEvent(new Event(CHANGE_EVENT));
      },
      t: locale === "tr" ? tr : en,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
