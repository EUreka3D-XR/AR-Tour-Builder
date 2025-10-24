import { useLocale } from "@/hooks/useLocale";
import { localeValue } from "@/utils/inputLocale";

function InjectedLocaleValue({ value }) {
  const locale = useLocale();

  if (!value) return null;

  return localeValue(value, locale);
}

export default InjectedLocaleValue;
