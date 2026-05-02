import i18n from "@/config/translations/i18next-config";

export const inputLocaleName = (name, locale) => {
  return `${name}.locales.${locale}`;
};
export const inputLocaleValue = (values, name, locale) => {
  return values[name].locales[locale];
};
export const localeValue = (value, locale = i18n.language) => {
  if (isLocalesValue(value)) {
    return value?.locales?.[locale];
  }
  return value;
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

/**
 * Returns the field value, or a translated "No <language> <field>" fallback when empty.
 *
 * @param {string} value - The field value (e.g. a localized title or description string)
 * @param {"en"|"fr"} locale - The language this field belongs to
 * @param {"title"|"description"} fieldType - The type of field being displayed
 * @param {Function} t - The i18next t function
 */
export const getFieldOrFallback = (value, locale, fieldType, t) => {
  if (value) return value;
  return t(`common.empty_field.no_${fieldType}_${locale}`);
};

export const localizeData = (data, locale) => {
  const transform = (value) => {
    // If it's a multilingual value, extract the locale and stop recursing
    if (isLocalesValue(value)) {
      return value.locales[locale] || "";
    }

    // If it's an object or array, recurse into it
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.map((item) => transform(item));
      }

      // For objects, transform each property
      const result = {};
      for (const [key, val] of Object.entries(value)) {
        result[key] = transform(val);
      }
      return result;
    }

    // For primitive values, return as-is
    return value;
  };

  return transform(data);
};
