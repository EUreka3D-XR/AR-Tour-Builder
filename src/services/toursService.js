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
 * @param {string} tourId
 * @returns {TourFetchResult}
 */
export const useProjectTour = (tourId, propLocale) => {
  const locale = useLocale();
  const effectiveLocale = propLocale || locale;

  return useDataFetcher({
    fetcher: () => api.tours.fetchOne(tourId, effectiveLocale),
    queryKey: ["project-tour", tourId, effectiveLocale],
    storeValue: true,
  });
};

/**
 * @param {string} tourId
 * @returns {TourFetchResult}
 */
export const useProjectTourMultilingual = (tourId) => {
  return useDataFetcher({
    fetcher: () => api.tours.fetchOne(tourId),
    queryKey: ["project-tour", tourId, "multilingual"],
    storeValue: true,
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
 * @param {string} tourId
 * @returns {TourMutateResult}
 */
export const useUpdateTour = (tourId) => {
  return useDataMutator({
    mutator: ({ data }) => api.tours.update(tourId, data),
    mutationKey: ["update-tour", tourId],
    invalidateKey: ["project-tour", tourId],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @returns {TourMutateResult}
 */
export const useDeleteTour = (projectId, tourId) => {
  return useDataMutator({
    mutator: () => api.tours.delete(tourId),
    mutationKey: ["delete-tour", tourId],
    invalidateKey: ["project-tours", projectId],
  });
};

/**
 * @param {string} tourId
 * @returns {TourMutateResult}
 */
export const usePublishTour = (tourId) => {
  return useDataMutator({
    mutator: ({ publish }) => api.tours.publish(tourId, publish),
    mutationKey: ["publish-tour", tourId],
    invalidateKey: ["project-tour", tourId],
  });
};
