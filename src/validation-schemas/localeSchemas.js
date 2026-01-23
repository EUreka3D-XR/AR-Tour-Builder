import Yup from "@/utils/yupImporter";

// Validators for different value types
const validators = {
  text: (value = "") => value.trim().length > 0,
  editor: (value) => {
    const blocks = value?.blocks || [];
    return Array.isArray(blocks) && blocks.length > 0;
  },
  array: (value) => Array.isArray(value) && value.length > 0,
  any: (value) => value !== null && value !== undefined && value !== "",
};

/**
 * Base locale schema factory with optional value validation and required check
 * @param {Yup.Schema} [valueSchema] - Optional Yup schema to validate each locale value
 * @param {Object} [options] - Options
 * @param {string} [options.requiredMessage] - If provided, at least one locale must have a non-empty value
 * @param {Function} [options.valueValidator] - Custom validator function for checking if a value is "filled"
 * @returns Yup schema for locale object structure { locales: { en: ..., fr: ... } }
 */
const localeSchema = (valueSchema, options = {}) => {
  const { requiredMessage, valueValidator } = options;

  const localesShape = valueSchema
    ? Yup.lazy((locales) =>
        Yup.object(
          Object.keys(locales || {}).reduce((acc, key) => {
            acc[key] = valueSchema;
            return acc;
          }, {}),
        ),
      )
    : Yup.object();

  let schema = Yup.object()
    .shape({
      locales: localesShape,
    })
    .test("has-locale-key", "At least one locale key is required", (obj) => {
      const { locales } = obj || {};
      return locales && Object.keys(locales).length > 0;
    });

  if (requiredMessage && valueValidator) {
    schema = schema.test("has-locale-value", requiredMessage, (obj) => {
      const { locales } = obj || {};
      return locales && Object.values(locales).some(valueValidator);
    });
  }

  return schema;
};

// Value schemas for different types
const textValueSchema = Yup.string();
const textArrayValueSchema = Yup.array().of(Yup.string());
const linkSchema = Yup.object().shape({
  url: Yup.string(),
  title: Yup.string(),
});
const linksArrayValueSchema = Yup.array().of(linkSchema);

/**
 * Locale schema for text values: { locales: { en: "string", fr: "string" } }
 * @param {string} [requiredMessage] - If provided, at least one locale must have non-empty text
 */
const localeText = (requiredMessage) =>
  localeSchema(textValueSchema, {
    requiredMessage,
    valueValidator: validators.text,
  });

/**
 * Locale schema for text array values: { locales: { en: ["a", "b"], fr: ["c"] } }
 * @param {string} [requiredMessage] - If provided, at least one locale must have non-empty array
 */
const localeTextArray = (requiredMessage) =>
  localeSchema(textArrayValueSchema, {
    requiredMessage,
    valueValidator: validators.array,
  });

/**
 * Locale schema for links array values: { locales: { en: [{url, title}], fr: [{url, title}] } }
 * @param {string} [requiredMessage] - If provided, at least one locale must have non-empty array
 */
const localeLinksArray = (requiredMessage) =>
  localeSchema(linksArrayValueSchema, {
    requiredMessage,
    valueValidator: validators.array,
  });

export { localeSchema, localeText, localeTextArray, localeLinksArray };
