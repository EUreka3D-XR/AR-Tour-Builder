import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').PoiAsset} PoiAsset
 * @typedef {import('@/types/jsdoc-types').FetchResultType<PoiAsset[]>} PoiAssetsResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<PoiAsset>} PoiAssetResult
 */

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @returns {PoiAssetsResult}
 */
export const usePoiAssets = (projectId, tourId, poiId, params) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () =>
      api.assets.fetchAll(projectId, tourId, poiId, { params, locale }),
    queryKey: ["poi-assets", projectId, tourId, poiId, locale],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @param {string} assetId
 * @returns {PoiAssetResult}
 */
export const usePoiAsset = (projectId, tourId, poiId, assetId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () =>
      api.assets.fetchOne(projectId, tourId, poiId, assetId, locale),
    queryKey: ["poi-asset", projectId, tourId, poiId, assetId, locale],
    shouldStoreValue: true,
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @param {string} assetId
 * @returns {PoiAssetResult}
 */
export const usePoiAssetMultilingual = (projectId, tourId, poiId, assetId) => {
  return useDataFetcher({
    fetcher: () => api.assets.fetchOne(projectId, tourId, poiId, assetId),
    queryKey: ["poi-asset", projectId, tourId, poiId, assetId, "multilingual"],
    shouldStoreValue: true,
    enabled: !!assetId,
  });
};
