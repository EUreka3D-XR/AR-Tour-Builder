import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').Poi} Poi
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Poi[]>} PoisResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Poi>} PoiResult
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
export const useTourPoi = (projectId, tourId, poiId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.pois.fetchOne(projectId, tourId, poiId, locale),
    queryKey: ["project-tour-poi", projectId, tourId, poiId, locale],
    shouldStoreValue: true,
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
    shouldStoreValue: true,
    enabled: !!poiId,
  });
};
