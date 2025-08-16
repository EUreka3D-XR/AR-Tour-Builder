import { api } from "@/api";

import { useDataFetcher } from "./helpers/serviceHooks";

export const useProjects = (locale) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchAll({ locale }),
    queryKey: ["projects", locale],
  });
};

export const useProject = (projectId, locale) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne(projectId, { locale }),
    queryKey: ["project", projectId, locale],
  });
};
