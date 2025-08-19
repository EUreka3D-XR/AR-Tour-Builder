import { api } from "@/api";

import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').Project} Project
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Project[]>} ProjectsResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Project>} ProjectResult
 */

/**
 * @param {string} locale
 * @returns {ProjectsResult}
 */
export const useProjects = (locale) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchAll({ locale }),
    queryKey: ["projects", locale],
  });
};

/**
 * @param {string} projectId
 * @param {string} locale
 * @returns {ProjectResult}
 */
export const useProject = (projectId, locale) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne(projectId, { locale }),
    queryKey: ["project", projectId, locale],
  });
};
