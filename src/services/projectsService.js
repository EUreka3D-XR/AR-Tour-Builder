import { api } from "@/api";

import { useDataFetcher } from "./helpers/serviceHooks";

export const useProjects = () => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchAll(),
    queryKey: ["projects"],
  });
};

export const useProject = (projectId) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne(projectId),
    queryKey: ["project", projectId],
  });
};
