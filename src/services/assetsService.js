import { api } from "@/api";
import { useQueryClient } from "@tanstack/react-query";

import { useLocale } from "@/hooks/useLocale";
import { localizeData } from "@/utils/inputLocale";
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
 * @param {string} locale
 * @returns {PoiAssetMutateResult}
 */
export const useCreatePoiAsset = (poiId, locale) => {
  const qc = useQueryClient();
  return useDataMutator({
    mutator: ({ data }) => api.poiAssets.create(poiId, data),
    mutationKey: ["create-poi-asset", poiId],
    invalidateKey: ["poi-assets", poiId],
    onSuccess: (data) => {
      let newData = data;
      if (locale) {
        newData = localizeData(data, locale);
      }
      qc.setQueryData(["poi-assets", poiId], (oldData) => {
        if (!oldData) return [newData];
        return [newData, ...oldData];
      });
    },
  });
};

/**
 * @param {string} poiId
 * @param {string} assetId
 * @param {string} locale
 * @returns {PoiAssetMutateResult}
 */
export const useUpdatePoiAsset = (poiId, assetId, locale) => {
  const qc = useQueryClient();

  return useDataMutator({
    mutator: ({ data }) => api.poiAssets.update(assetId, data),
    mutationKey: ["update-poi-asset", assetId],
    invalidateKey: ["poi-asset", assetId],
    onSuccess: (data) => {
      // The update returns multilingual data, but the list cache expects localized data
      // So we need to extract the current locale's data from the multilingual response
      let newData = data;
      if (locale) {
        newData = localizeData(data, locale);
      }

      qc.setQueryData(["poi-assets", poiId], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((asset) =>
          asset.id === newData.id ? newData : asset,
        );
      });
    },
  });
};

/**
 * @param {string} poiId
 * @param {string} assetId
 * @returns {PoiAssetMutateResult}
 */
export const useDeletePoiAsset = (poiId, assetId) => {
  const qc = useQueryClient();

  return useDataMutator({
    mutator: () => api.poiAssets.delete(assetId),
    mutationKey: ["delete-poi-asset", assetId],
    invalidateKey: ["poi-assets", poiId],
    onSuccess: () => {
      qc.setQueryData(["poi-assets", poiId], (oldData) => {
        if (!oldData) return oldData;
        return oldData.filter((asset) => String(asset.id) !== String(assetId));
      });
    },
  });
};
