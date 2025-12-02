import { createContext, useContext } from "react";

// /**
//  * @typedef {Object} TourContextType
//  * @property {import("@/types/jsdoc-types").Tour} tour - Selected tour localized.
//  * @property {import("@/types/jsdoc-types").FetchStateType} fetchState - Fetch state of the tour.
//  */
export const UserContext = createContext({});

// /**
//  *
//  * @returns {TourContextType}
//  */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
