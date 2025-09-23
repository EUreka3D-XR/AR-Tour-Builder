/**
 * @typedef {import('@/types/jsdoc-types').Asset} Asset
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Asset[]>} AssetsResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Asset>} AssetResult
 */

import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @param {string} projectId
 * @returns {AssetsResult}
 */
export const useLibraryAssets = (projectId, params) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.library.fetchAll(projectId, { params, locale }),
    queryKey: ["library-assets", locale, params],
  });
};
