/**
 * Normalizes relationship attributes by converting arrays of objects
 * to arrays of IDs. For keys ending with 's', it creates a new key
 * with 'Ids' suffix.
 * @param {Object} attrs
 * @param {Array<string>} relationshipKeys
 * @returns
 */
function normalizeRelationships(attrs, relationshipKeys = []) {
  const result = { ...attrs };
  relationshipKeys.forEach((key) => {
    if (
      Array.isArray(result[key]) &&
      result[key].length > 0 &&
      typeof result[key][0] === "object"
    ) {
      // If the key ends with 's', convert to singular + 'Ids'
      if (key.endsWith("s")) {
        const singular = key.slice(0, -1);
        const idsKey = singular + "Ids";
        result[idsKey] = result[key].map((item) => item.id);
        delete result[key];
      } else {
        // For other keys, just replace with array of IDs
        result[key] = result[key].map((item) => item.id);
      }
    }
  });
  return result;
}

export default normalizeRelationships;
