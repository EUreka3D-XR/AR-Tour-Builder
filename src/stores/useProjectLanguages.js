import { create } from "zustand";

/**
 * Store for project languages.
 * - available: Array<Locale>
 * - primary: string (language code)
 */
const useStore = create((set) => ({
  available: [],
  primary: null,

  setLanguages: (languages = []) => {
    set({ available: languages });
  },

  // Set primary language if it exists in available
  setPrimary: (value) => {
    const val = value == null ? null : String(value);
    set((state) => ({
      primary: state.available.includes(val) ? val : state.primary,
    }));
  },
}));

/**
 * @typedef ProjectLanguagesReturnValue
 * @property {string} primary
 * @property {string[]} available
 * @property {(value: string) => void} setPrimary
 * @property {(languages: string[]) => void} setLanguages
 */
/**
 * @returns {ProjectLanguagesReturnValue}
 */
const useProjectLanguages = () => {
  const available = useStore((s) => s.available);
  const primary = useStore((s) => s.primary);
  const setLanguages = useStore((s) => s.setLanguages);
  const setPrimary = useStore((s) => s.setPrimary);

  return {
    available,
    primary,
    setLanguages,
    setPrimary,
  };
};

export default useProjectLanguages;
