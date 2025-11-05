import { LocalesDictionaryReverse } from "@/utils/localesUtils";

export default class LocaleCDNDto {
  /**
   *
   * @param {import("@/types/jsdoc-types").LocaleFromApi} data
   * @returns {import("@/types/jsdoc-types").Locale[]}
   */
  static fromApi(data) {
    const localesArray = Object.entries(data).map(([key, value]) => {
      return {
        value: key,
        label: value,
      };
    });
    // remove locales like us-en, gb-en keeping only en, fr, de, etc
    const minimized = localesArray.filter((loc) => loc.value.length == 2);
    const sorted = minimized.sort((a, b) => {
      return a.label.localeCompare(b.label);
    });

    // replace locales keys with i18n standard keys
    const withI18nKeys = sorted.map((loc) => {
      return {
        ...loc,
        value: LocalesDictionaryReverse[loc.value] || loc.value,
      };
    });

    return withI18nKeys;
  }
}
