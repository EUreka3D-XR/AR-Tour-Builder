import { createContext, useContext } from "react";

export const GeneralContext = createContext({
  isNavMenuOpen: true,
  isInsideAProject: true,
  toggleNavMenu: () => {},
});

export const useGeneralProvider = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralProvider must be used within a GeneralProvider");
  }
  return context;
};
