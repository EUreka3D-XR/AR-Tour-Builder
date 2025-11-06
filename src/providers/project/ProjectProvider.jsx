import { useEffect, useMemo } from "react";
import { useParams } from "react-router";

import { useProject } from "@/services/projectsService";
import { useAvailableLocalesProvider } from "../locales/AvailableLocalesContext";
import { ProjectContext } from "./ProjectContext";

export const ProjectProvider = ({ children }) => {
  const { projectId } = useParams();

  const { data, fetchState } = useProject(projectId);

  const { updateProjectLocales } = useAvailableLocalesProvider();

  useEffect(() => {
    if (fetchState.isSuccess && data) {
      updateProjectLocales(data.locales);
    }
  }, [fetchState.isSuccess, data, updateProjectLocales]);

  const value = useMemo(
    () => ({
      project: data,
      fetchState,
    }),
    [fetchState, data],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
