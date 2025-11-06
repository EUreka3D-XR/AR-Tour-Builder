import { createContext, useContext } from "react";

/**
 * @typedef {Object} AvailableLocalesContextType
 * @property {Array<import("@/types/jsdoc-types").Locale>} available - List of available locales.
 * @property {(locales: Array<string>) => void} updateTourLocales - Function to change the current locale.
 * @property {(locales: Array<string>) => void} updateProjectLocales - Function to change the current locale.
 */
export const AvailableLocalesContext = createContext({});

/**
 *
 * @returns {AvailableLocalesContextType}
 */
export const useAvailableLocalesProvider = () => {
  const context = useContext(AvailableLocalesContext);
  if (!context) {
    throw new Error(
      "useAvailableLocalesProvider must be used within a AvailableLocalesProvider",
    );
  }
  return context;
};
