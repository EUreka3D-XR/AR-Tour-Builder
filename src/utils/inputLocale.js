import i18n from "@/config/translations/i18next-config";

export const inputLocaleName = (name, locale) => {
  return `${name}.locales.${locale}`;
};
export const inputLocaleValue = (values, name, locale) => {
  return values[name].locales[locale];
};
export const localeValue = (value, locale = i18n.language) => {
  return value?.locales?.[locale];
};

export const getLocaleValues = (values, name, index) => {
  if (typeof index === "number") {
    return values[name]?.[index]?.locales;
  }
  return values[name]?.locales;
};

export const isLocalesValue = (value) => {
  return (
    value &&
    typeof value === "object" &&
    value.locales &&
    typeof value.locales === "object" &&
    Object.keys(value.locales).length > 0
  );
};
