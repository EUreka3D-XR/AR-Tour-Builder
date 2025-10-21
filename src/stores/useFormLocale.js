import { useEffect } from "react";
import { create } from "zustand";

const useStore = create((set) => ({
  current: "",
  setCurrent: (value) => {
    set(() => {
      return {
        current: value,
      };
    });
  },
}));

/**
 * @typedef FormLocaleReturnValue
 * @property {string} locale
 * @property {(value: string) => void} setCurrentLocale
 */
/**
 * @param {string} [initialLocale]
 * @returns {FormLocaleReturnValue}
 */
const useFormLocale = (initialLocale) => {
  const current = useStore((s) => s.current);
  const setCurrent = useStore((s) => s.setCurrent);

  useEffect(() => {
    if (initialLocale) {
      setCurrent(initialLocale);
    }
  }, [initialLocale, setCurrent]);

  const finalCurrent = current || "en";

  return {
    locale: finalCurrent,
    setCurrentLocale: setCurrent,
  };
};

export default useFormLocale;
