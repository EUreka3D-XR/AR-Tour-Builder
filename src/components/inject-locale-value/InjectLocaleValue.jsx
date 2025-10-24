import { useLocale } from "@/hooks/useLocale";
import { isLocalesValue, localeValue } from "@/utils/inputLocale";

function InjectedLocaleString({ string }) {
  const locale = useLocale();

  if (!string) return null;

  if (isLocalesValue(string)) {
    const localeString = localeValue(string, locale);
    return localeString;
  }
  return string;
}

export default InjectedLocaleString;
