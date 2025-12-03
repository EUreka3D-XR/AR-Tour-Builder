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
 * @param {string} poiId
 * @returns {PoiAssetsResult}
 */
export const usePoiAssets = (poiId, params) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.poiAssets.fetchAll(poiId, { params, locale }),
    queryKey: ["poi-assets", poiId],
  });
};

/**
 * @param {string} assetId
 * @returns {PoiAssetResult}
 */
export const usePoiAsset = (assetId, propLocale) => {
  const locale = useLocale();
  const effectiveLocale = propLocale || locale;

  return useDataFetcher({
    fetcher: () => api.poiAssets.fetchOne(assetId, effectiveLocale),
    queryKey: ["poi-asset", assetId, effectiveLocale],
    enabled: !!assetId,
    storeValue: true,
  });
};

/**
 * @param {string} assetId
 * @returns {PoiAssetResult}
 */
export const usePoiAssetMultilingual = (assetId) => {
  return useDataFetcher({
    fetcher: () => api.poiAssets.fetchOne(assetId),
    queryKey: ["poi-asset", assetId, "multilingual"],
    storeValue: true,
    enabled: !!assetId,
  });
};

/**
 * @param {string} poiId
 * @returns {PoiAssetMutateResult}
 */
export const useCreatePoiAsset = (poiId) => {
  return useDataMutator({
    mutator: ({ data }) => api.poiAssets.create(poiId, data),
    mutationKey: ["create-poi-asset", poiId],
    invalidateKey: ["poi-assets", poiId],
  });
};

/**
 * @param {string} assetId
 * @returns {PoiAssetMutateResult}
 */
export const useUpdatePoiAsset = (assetId) => {
  return useDataMutator({
    mutator: ({ data }) => api.poiAssets.update(assetId, data),
    mutationKey: ["update-poi-asset", assetId],
    invalidateKey: ["poi-asset", assetId],
  });
};

/**
 * @param {string} poiId
 * @param {string} assetId
 * @returns {PoiAssetMutateResult}
 */
export const useDeletePoiAsset = (poiId, assetId) => {
  return useDataMutator({
    mutator: () => api.poiAssets.delete(assetId),
    mutationKey: ["delete-poi-asset", assetId],
    invalidateKey: ["poi-assets", poiId],
  });
};
