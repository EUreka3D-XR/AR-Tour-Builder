import { createContext, useContext } from "react";

/**
 * @typedef {Object} ProjectContextType
 * @property {import("@/types/jsdoc-types").Project} project - Selected project localized.
 * @property {import("@/types/jsdoc-types").FetchStateType} fetchState - Fetch state of the project.
 */
export const ProjectContext = createContext({});

/**
 *
 * @returns {ProjectContextType}
 */
export const useProjectProvider = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectProvider must be used within a ProjectProvider");
  }
  return context;
};
