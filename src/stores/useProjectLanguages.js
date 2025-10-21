import { create } from "zustand";

/**
 * Store for project languages.
 * - available: Array<string> (language codes)
 * - primary: string (language code)
 */
const useStore = create((set) => ({
  available: [],
  primary: null,

  // Replace the available languages with an array of codes
  setLanguages: (languages = []) => {
    const normalized = Array.isArray(languages)
      ? languages.map((l) => String(l))
      : [];

    set((state) => {
      const current = state.primary;
      const exists = normalized.includes(current);
      return {
        available: normalized,
        primary: exists ? current : (normalized[0] ?? null),
      };
    });
  },

  // Set primary language if it exists in available
  setPrimary: (value) => {
    const val = value == null ? null : String(value);
    set((state) => ({
      primary: state.available.includes(val) ? val : state.primary,
    }));
  },

  // Set both languages and primary at once
  setLanguagesAndPrimary: (languages = [], primaryValue = null) => {
    const normalized = Array.isArray(languages)
      ? languages.map((l) => String(l))
      : [];

    const primary =
      primaryValue != null ? String(primaryValue) : (normalized[0] ?? null);
    const exists = normalized.includes(primary);

    set({
      available: normalized,
      primary: exists ? primary : (normalized[0] ?? null),
    });
  },
}));

/**
 * @typedef ProjectLanguagesReturnValue
 * @property {string} primary
 * @property {string[]} available
 * @property {(value: string) => void} setPrimary
 * @property {(languages: string[]) => void} setLanguages
 * @property {(languages: string[], primaryValue: string|null) => void} setLanguagesAndPrimary
 */
/**
 * @returns {ProjectLanguagesReturnValue}
 */
const useProjectLanguages = () => {
  const available = useStore((s) => s.available);
  const primary = useStore((s) => s.primary);
  const setLanguages = useStore((s) => s.setLanguages);
  const setPrimary = useStore((s) => s.setPrimary);
  const setLanguagesAndPrimary = useStore((s) => s.setLanguagesAndPrimary);

  return {
    available,
    primary,
    setLanguages,
    setPrimary,
    setLanguagesAndPrimary,
  };
};

export default useProjectLanguages;
