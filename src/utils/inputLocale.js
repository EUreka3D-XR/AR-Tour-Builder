export const inputLocaleName = (name, locale) => {
  return `${name}.locales.${locale}`;
};
export const inputLocaleValue = (values, name, locale) => {
  return values[name].locales[locale];
};

export const getLocaleValues = (values, name, index) => {
  if (typeof index === "number") {
    return values[name]?.[index]?.locales;
  }
  return values[name]?.locales;
};
