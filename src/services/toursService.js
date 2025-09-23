import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').Tour} Tour
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Tour[]>} ToursResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Tour>} TourResult
 */

/**
 * @param {string} projectId
 * @returns {ToursResult}
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
 * @returns {TourResult}
 */
export const useProjectTour = (projectId, tourId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.tours.fetchOne(projectId, tourId, locale),
    queryKey: ["project-tour", projectId, tourId, locale],
    shouldStoreValue: true,
  });
};
