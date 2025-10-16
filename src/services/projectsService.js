import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').Project} Project
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Project[]>} ProjectsResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Project>} ProjectResult
 */

/**
 * @returns {ProjectsResult}
 */
export const useProjects = () => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.projects.fetchAll(locale),
    queryKey: ["projects", locale],
  });
};

/**
 * @returns {ProjectsResult}
 */
const useProjectsMultilingual = () => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchAll(),
    queryKey: ["projects", "multilingual"],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
export const useProject = (projectId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne(projectId, locale),
    queryKey: ["project", projectId, locale],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
const useProjectMultilingual = (projectId) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne(projectId),
    queryKey: ["project", projectId, "multilingual"],
  });
};

useProjects.multilingual = useProjectsMultilingual;
useProject.multilingual = useProjectMultilingual;
