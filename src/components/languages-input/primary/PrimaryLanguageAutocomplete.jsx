import { useMemo } from "react";
import { useWatch } from "react-hook-form";

import { useAllLocales } from "@/services/localesService";
import LanguagesAutocomplete from "../_common/LanguagesAutocomplete";

function PrimaryLanguageInput({ value, onChange, syncWithFormInputLocale }) {
  const { data, fetchState } = useAllLocales();
  const locales = useWatch({ name: "locales" });

  const availableLocales = useMemo(() => {
    if (!locales || !data) return [];
    return data.filter((locale) => locales.includes(locale.value));
  }, [locales, data]);

  const handleChange = (val) => {
    onChange?.(val);
  };

  return (
    <LanguagesAutocomplete
      value={value}
      options={availableLocales}
      isLoading={fetchState.isLoading}
      onChange={handleChange}
    />
  );
}

export default PrimaryLanguageInput;
