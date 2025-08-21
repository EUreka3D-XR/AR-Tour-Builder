import { useTranslation } from "react-i18next";
import { api } from "@/api";

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
  return useDataFetcher({
    fetcher: () => api.projects.fetchAll(),
    queryKey: ["projects"],
  });
};

/**
 * @returns {ProjectsResult}
 */
const useProjectsLocalized = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  return useDataFetcher({
    fetcher: () => api.projects.fetchAll.localized(locale),
    queryKey: ["projects", locale],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
export const useProject = (projectId) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne(projectId),
    queryKey: ["project", projectId],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
const useProjectLocalized = (projectId) => {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne.localized(projectId, locale),
    queryKey: ["project", projectId, locale],
  });
};

useProjects.localized = useProjectsLocalized;
useProject.localized = useProjectLocalized;
