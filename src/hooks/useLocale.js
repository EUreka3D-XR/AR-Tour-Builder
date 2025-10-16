import { useTranslation } from "react-i18next";

/**
 * Custom hook that returns the current locale in simplified format (e.g., 'en', 'fr', 'es')
 * Strips out region codes like 'en-US' -> 'en' or 'fr-CA' -> 'fr'
 *
 * @returns {string} The simplified locale code (e.g., 'en', 'fr', 'es')
 */
export const useLocale = () => {
  const { i18n } = useTranslation();

  // Extract just the language part, ignoring region/country codes
  const locale = i18n.language?.split("-")[0] || "en";

  return locale;
};
