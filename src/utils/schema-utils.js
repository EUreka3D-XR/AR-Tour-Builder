import Yup from "@/utils/yupImporter";

const validateLocaleString = (value = "") => {
  return value.trim().length > 0;
};
const validateLocaleEditorObject = (value) => {
  const blocks = value?.blocks || [];
  if (Array.isArray(blocks) && blocks.length > 0) {
    return true;
  }
  return false;
};

/**
 *
 * @param {string} message
 * @param {'text' | 'editor'} variant
 * @returns
 */
const localesRequired = (message, variant = "text") => {
  const validateFn =
    variant === "text" ? validateLocaleString : validateLocaleEditorObject;

  return Yup.object().test("has-key-with-value", message, (localesObject) => {
    const { locales } = localesObject;
    return locales && Object.values(locales).some(validateFn);
  });
};

const localesArrayRequired = (message, variant = "text") => {
  return Yup.array()
    .of(Yup.object())
    .test(
      "at-least-one-valid",
      message,
      (arrayValue) =>
        arrayValue &&
        arrayValue.some((item) =>
          localesRequired(message, variant).isValidSync(item),
        ),
    );
};

export const initSchemaMethods = () => {
  Yup.addMethod(Yup.object, "localesTextRequired", function (message) {
    return this.test("locales-text", message, (objectValue) =>
      localesRequired(message, "text").isValidSync(objectValue),
    );
  });

  Yup.addMethod(Yup.object, "localesEditorRequired", function (message) {
    return this.test("locales-editor", message, (objectValue) =>
      localesRequired(message, "editor").isValidSync(objectValue),
    );
  });

  Yup.addMethod(Yup.array, "localesTextArrayRequired", function (message) {
    return this.test("locales-text-array", message, (arrayValue) =>
      localesArrayRequired(message, "text").isValidSync(arrayValue),
    );
  });
};
