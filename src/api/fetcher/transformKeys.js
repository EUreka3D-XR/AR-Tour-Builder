import { deepTransformKeys } from "@/utils/deepTransformObjects";

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
