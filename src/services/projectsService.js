import { api } from "@/api";
import { useQueryClient } from "@tanstack/react-query";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher, useDataMutator } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').Project} Project
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Project[]>} ProjectsResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Project>} ProjectResult
 * @typedef {import('@/types/jsdoc-types').MutationResultType<Project>} ProjectMutateResult
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
export const useProjectsMultilingual = () => {
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
    queryKey: ["project", projectId, "localized"],
    storeValue: true,
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
export const useProjectPopulated = (projectId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.projects.fetchOnePopulated(projectId, locale),
    queryKey: ["project", projectId, "localized", "populated"],
    storeValue: true,
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
export const useProjectMultilingual = (projectId) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchOne(projectId),
    queryKey: ["project", projectId, "multilingual"],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectResult}
 */
export const useProjectPopulatedMultilingual = (projectId) => {
  return useDataFetcher({
    fetcher: () => api.projects.fetchOnePopulated(projectId),
    queryKey: ["project", projectId, "multilingual", "populated"],
  });
};

/**
 * @returns {ProjectMutateResult}
 */
export const useCreateProject = () => {
  return useDataMutator({
    mutator: ({ data }) => api.projects.create(data),
    mutationKey: ["create-project"],
    invalidateKey: ["projects"],
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectMutateResult}
 */
export const useUpdateProject = (projectId) => {
  const qc = useQueryClient();

  return useDataMutator({
    mutator: ({ data }) => api.projects.update(projectId, data),
    mutationKey: ["update-project", projectId],
    invalidateKey: ["project", projectId, "localized"],
    onSuccess: (_, variables) => {
      const updateQuery = (queryKey) => {
        qc.setQueryData(queryKey, (oldData) => {
          return { ...oldData, ...variables.data };
        });
      };
      updateQuery(["project", projectId, "multilingual"]);
      updateQuery(["project", projectId, "multilingual", "populated"]);
    },
  });
};

/**
 * @param {string} projectId
 * @returns {ProjectMutateResult}
 */
export const useDeleteProject = (projectId) => {
  return useDataMutator({
    mutator: () => api.projects.delete(projectId),
    mutationKey: ["delete-project", projectId],
    invalidateKey: ["projects"],
  });
};
