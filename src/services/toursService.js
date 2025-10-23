import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher, useDataMutator } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').Tour} Tour
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Tour[]>} ToursFetchResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Tour>} TourFetchResult
 * @typedef {import('@/types/jsdoc-types').MutationResultType<Tour>} TourMutateResult
 */

/**
 * @param {string} projectId
 * @returns {ToursFetchResult}
 */
export const useProjectTours = (projectId, params) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.tours.fetchAll(projectId, { params, locale }),
    queryKey: ["project-tours", projectId, locale],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @returns {TourFetchResult}
 */
export const useProjectTour = (projectId, tourId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.tours.fetchOne(projectId, tourId, locale),
    queryKey: ["project-tour", projectId, tourId, locale],
    shouldStoreValue: true,
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @returns {TourFetchResult}
 */
export const useProjectTourMultilingual = (projectId, tourId) => {
  return useDataFetcher({
    fetcher: () => api.tours.fetchOne(projectId, tourId),
    queryKey: ["project-tour", projectId, tourId, "multilingual"],
    shouldStoreValue: true,
    enabled: !!tourId,
  });
};

/**
 * @param {string} projectId
 * @returns {TourMutateResult}
 */
export const useCreateTour = (projectId) => {
  return useDataMutator({
    mutator: ({ data }) => api.tours.create(projectId, data),
    mutationKey: ["create-tour", projectId],
    invalidateKey: ["project-tours", projectId],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @returns {TourMutateResult}
 */
export const useUpdateTour = (projectId, tourId) => {
  return useDataMutator({
    mutator: ({ data }) => api.tours.update(projectId, tourId, data),
    mutationKey: ["update-tour", projectId, tourId],
    invalidateKey: ["project-tour", projectId, tourId],
  });
};
