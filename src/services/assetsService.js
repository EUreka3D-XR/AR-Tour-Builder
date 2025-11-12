import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher, useDataMutator } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').PoiAsset} PoiAsset
 * @typedef {import('@/types/jsdoc-types').FetchResultType<PoiAsset[]>} PoiAssetsResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<PoiAsset>} PoiAssetResult
 * @typedef {import('@/types/jsdoc-types').MutationResultType<PoiAsset>} PoiAssetMutateResult
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
      api.poiAssets.fetchAll(projectId, tourId, poiId, { params, locale }),
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
export const usePoiAsset = (projectId, tourId, poiId, assetId, propLocale) => {
  const locale = useLocale();
  const effectiveLocale = propLocale || locale;

  return useDataFetcher({
    fetcher: () =>
      api.poiAssets.fetchOne(
        projectId,
        tourId,
        poiId,
        assetId,
        effectiveLocale,
      ),
    queryKey: ["poi-asset", projectId, tourId, poiId, assetId, effectiveLocale],
    enabled: !!assetId,
    storeValue: true,
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
    fetcher: () => api.poiAssets.fetchOne(projectId, tourId, poiId, assetId),
    queryKey: ["poi-asset", projectId, tourId, poiId, assetId, "multilingual"],
    storeValue: true,
    enabled: !!assetId,
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @returns {PoiAssetMutateResult}
 */
export const useCreatePoiAsset = (projectId, tourId, poiId) => {
  return useDataMutator({
    mutator: ({ data }) => api.poiAssets.create(projectId, tourId, poiId, data),
    mutationKey: ["create-poi-asset", projectId, tourId, poiId],
    invalidateKey: ["poi-assets", projectId, tourId, poiId],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @param {string} assetId
 * @returns {PoiAssetMutateResult}
 */
export const useUpdatePoiAsset = (projectId, tourId, poiId, assetId) => {
  return useDataMutator({
    mutator: ({ data }) =>
      api.poiAssets.update(projectId, tourId, poiId, assetId, data),
    mutationKey: ["update-poi-asset", projectId, tourId, poiId, assetId],
    invalidateKey: ["poi-asset", projectId, tourId, poiId, assetId],
  });
};

/**
 * @param {string} projectId
 * @param {string} tourId
 * @param {string} poiId
 * @param {string} assetId
 * @returns {PoiAssetMutateResult}
 */
export const useDeletePoiAsset = (projectId, tourId, poiId, assetId) => {
  return useDataMutator({
    mutator: () => api.poiAssets.delete(projectId, tourId, poiId, assetId),
    mutationKey: ["delete-poi-asset", projectId, tourId, poiId, assetId],
    invalidateKey: ["poi-assets", projectId, tourId, poiId],
  });
};
