import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "fr"], // Add all supported languages here (e.g., ["en", "fr", "es"])
    load: "languageOnly", // Use 'en' instead of 'en-US'
    detection: {
      checkWhitelist: true, // Only use detected language if it's in supportedLngs
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export const t = i18n.t.bind(i18n);
export const isEn = i18n.language.startsWith("en");
export default i18n;
