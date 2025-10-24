import { useLocale } from "@/hooks/useLocale";
import { isLocalesValue, localeValue } from "@/utils/inputLocale";

function InjectedLocaleValue({ value }) {
  const locale = useLocale();

  if (!value) return null;

  if (isLocalesValue(value)) {
    const localeString = localeValue(value, locale);
    return localeString;
  }
  return value;
}

export default InjectedLocaleValue;
