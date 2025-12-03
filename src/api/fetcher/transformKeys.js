const deepTransformKeys = (obj, transform, exclude = []) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepTransformKeys(item, transform));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const finalKey = exclude.includes(key) ? key : transform(key);
      return [finalKey, deepTransformKeys(value, transform)];
    }),
  );
};

const snakeToCamel = (str) => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const camelToSnake = (str) => {
  return str.replace(/([A-Z])/g, (_, letter) => `_${letter.toLowerCase()}`);
};

export const transformKeysToCamel = (data, exclude = []) => {
  return deepTransformKeys(data, snakeToCamel, exclude);
};

export const transformKeysToSnake = (data, exclude = []) => {
  return deepTransformKeys(data, camelToSnake, exclude);
};
