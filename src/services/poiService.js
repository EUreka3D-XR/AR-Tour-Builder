import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher, useDataMutator } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').Poi} Poi
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Poi[]>} PoisResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Poi>} PoiResult
 * @typedef {import('@/types/jsdoc-types').MutationResultType<Poi>} PoiMutateResult
 *
 */

/**
 * @param {string} projectId
 * @param {string} tourId
 * @returns {PoisResult}
 */
export const useTourPois = (projectId, tourId, params) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.pois.fetchAll(projectId, tourId, { params, locale }),
    queryKey: ["project-tour-pois", projectId, tourId, locale],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @returns {PoiResult}
 */
export const useTourPoi = (projectId, tourId, poiId, propLocale) => {
  const locale = useLocale();
  const effectiveLocale = propLocale || locale;

  return useDataFetcher({
    fetcher: () => api.pois.fetchOne(projectId, tourId, poiId, effectiveLocale),
    queryKey: ["project-tour-poi", projectId, tourId, poiId, effectiveLocale],
    storeValue: true,
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @returns {PoiResult}
 */
export const useTourPoiMultilingual = (projectId, tourId, poiId) => {
  return useDataFetcher({
    fetcher: () => api.pois.fetchOne(projectId, tourId, poiId),
    queryKey: ["project-tour-poi", projectId, tourId, poiId, "multilingual"],
    storeValue: true,
    enabled: !!poiId,
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @returns {PoiMutateResult}
 */
export const useCreateTourPoi = (projectId, tourId) => {
  return useDataMutator({
    mutator: ({ data }) => api.pois.create(projectId, tourId, data),
    mutationKey: ["create-tour-poi", projectId, tourId],
    invalidateKey: ["project-tour-pois"],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @returns {PoiMutateResult}
 */
export const useUpdateTourPoi = (projectId, tourId, poiId) => {
  return useDataMutator({
    mutator: ({ data }) => api.pois.update(projectId, tourId, poiId, data),
    mutationKey: ["update-tour-poi", projectId, tourId, poiId],
    invalidateKey: ["project-tour-pois", projectId, tourId, poiId],
  });
};
