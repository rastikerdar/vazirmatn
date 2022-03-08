import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enStrings from "./locales/en.json";
import faStrings from "./locales/fa.json";
import arStrings from "./locales/ar.json";

type Resource = {
  translation: any;
  caption: string;
  localCaption: string;
};

type Resources = {
  [key: string]: Resource;
};

// the translations
export const resources: Resources = {
  fa: { translation: faStrings, caption: "Persian", localCaption: "فارسی" },
  ar: { translation: arStrings, caption: "Arabic", localCaption: "العربية" },
  en: { translation: enStrings, caption: "English", localCaption: "English" },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getDefaultLang(),
    debug: false,
    // keySeparator: ".",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export function getLanguageDirection(lang: string): "rtl" | "ltr" {
  return ["fa", "ar"].includes(lang) ? "rtl" : "ltr";
}

export function getLocalCaption(lang: string): string | null {
  return resources[lang] ? resources[lang].localCaption : null;
}

export function getLanguages(): string[] {
  return Object.keys(resources);
}

export function getDefaultLang(): string {
  return "fa";
}

export default i18n;
