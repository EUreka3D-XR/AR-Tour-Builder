import { createContext, useContext } from "react";

/**
 * @typedef {Object} TourContextType
 * @property {import("@/types/jsdoc-types").Tour} tour - Selected tour localized.
 * @property {import("@/types/jsdoc-types").FetchStateType} fetchState - Fetch state of the tour.
 */
export const TourContext = createContext({});

/**
 *
 * @returns {TourContextType}
 */
export const useTourProvider = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTourProvider must be used within a TourProvider");
  }
  return context;
};
