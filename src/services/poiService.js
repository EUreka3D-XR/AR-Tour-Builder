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
 * @param {string} tourId
 * @returns {PoisResult}
 */
export const useTourPois = (tourId, params) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.pois.fetchAll(tourId, { params, locale }),
    queryKey: ["our-pois", tourId],
  });
};

/**
 * @param {string} poiId
 * @returns {PoiResult}
 */
export const useTourPoi = (poiId, propLocale) => {
  const locale = useLocale();
  const effectiveLocale = propLocale || locale;

  return useDataFetcher({
    fetcher: () => api.pois.fetchOne(poiId, effectiveLocale),
    queryKey: ["tour-poi", poiId, effectiveLocale],
    storeValue: true,
  });
};

/**
 * @param {string} poiId
 * @returns {PoiResult}
 */
export const useTourPoiMultilingual = (poiId) => {
  return useDataFetcher({
    fetcher: () => api.pois.fetchOne(poiId),
    queryKey: ["tour-poi", poiId, "multilingual"],
    storeValue: true,
    enabled: !!poiId,
  });
};

/**
 * @param {string} tourId
 * @returns {PoiMutateResult}
 */
export const useCreateTourPoi = (tourId) => {
  return useDataMutator({
    mutator: ({ data }) => api.pois.create(tourId, data),
    mutationKey: ["create-tour-poi", tourId],
    invalidateKey: ["tour-pois", tourId],
  });
};

/**
 * @param {string} poiId
 * @returns {PoiMutateResult}
 */
export const useUpdateTourPoi = (poiId) => {
  return useDataMutator({
    mutator: ({ data }) => api.pois.update(poiId, data),
    mutationKey: ["update-tour-poi", poiId],
    invalidateKey: ["tour-pois", poiId],
  });
};

/**
 * @param {string} tourId
 * @param {string} poiId
 * @returns {PoiMutateResult}
 */
export const useDeleteTourPoi = (tourId, poiId) => {
  return useDataMutator({
    mutator: () => api.pois.delete(poiId),
    mutationKey: ["delete-tour-poi", poiId],
    invalidateKey: ["tour-pois", tourId],
  });
};
