export const deepTransformKeys = (obj, transform, exclude = []) => {
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

export const deepTransformValues = (obj, transform, exclude = []) => {
  if (typeof obj !== "object" || obj === null) {
    return transform(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepTransformValues(item, transform, exclude));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const finalValue = exclude.includes(key)
        ? value
        : deepTransformValues(value, transform, exclude);
      return [key, finalValue];
    }),
  );
};
