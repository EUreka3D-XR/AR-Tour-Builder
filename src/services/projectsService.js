import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher, useDataMutator } from "./helpers/serviceHooks";

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
    storeValue: true,
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
    storeValue: true,
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

/**
 * @returns {ProjectResult}
 */
export const useCreateProject = () => {
  return useDataMutator({
    fetcher: ({ data }) => api.projects.create(data),
    mutationKey: ["create-project"],
    invalidateKey: ["projects"],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
export const useUpdateProject = (projectId) => {
  return useDataMutator({
    fetcher: ({ data }) => api.projects.update(projectId, data),
    mutationKey: ["update-project", projectId],
    invalidateKey: ["project", projectId],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
export const useDeleteProject = (projectId) => {
  return useDataMutator({
    mutator: () => api.projects.delete(projectId),
    mutationKey: ["delete-project", projectId],
    invalidateKey: ["projects"],
  });
};

useProjects.multilingual = useProjectsMultilingual;
useProject.multilingual = useProjectMultilingual;
