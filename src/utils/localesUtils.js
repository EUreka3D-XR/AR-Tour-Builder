export const getFlagUrl = (locale) => {
  const loc = LocalesDictionary[locale] || locale;
  return `https://flagcdn.com/${loc}.svg`;
};
export const LocalesDictionary = {
  en: "gb",
};
export const LocalesDictionaryReverse = Object.fromEntries(
  Object.entries(LocalesDictionary).map(([key, value]) => [value, key]),
);
