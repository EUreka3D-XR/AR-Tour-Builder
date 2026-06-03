/**
 * @typedef {import('@/types/jsdoc-types').Asset} Asset
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Asset[]>} AssetsResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Asset>} AssetResult
 * @typedef {import('@/types/jsdoc-types').MutationResultType<Asset>} AssetMutateResult
 */

import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher, useDataMutator } from "./helpers/serviceHooks";

/**
 * @param {string} projectId
 * @param {Object} [filterParams]
 * @returns {AssetsResult}
 */
export const useLibraryAssets = (projectId, filterParams) => {
  const locale = useLocale();

  const params = {
    ...(filterParams?.type && { type: filterParams.type }),
    ...(filterParams?.searchTerm && { search: filterParams.searchTerm }),
    ...(filterParams?.ordering && { ordering: filterParams.ordering }),
    page: (filterParams?.page ?? 0) + 1, // DRF pagination is 1-based
    pageSize: filterParams?.pageSize ?? 10,
  };

  return useDataFetcher({
    fetcher: () => api.library.fetchAll(projectId, { params, locale }),
    queryKey: ["library-assets", projectId, locale, params],
  });
};

/**
 * @param {string} assetId
 * @returns {AssetsResult}
 */
export const useLibraryAsset = (assetId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.library.fetchOne(assetId, locale),
    queryKey: ["library-asset", assetId, locale],
  });
};

/**
 * @param {string} assetId
 * @returns {AssetResult}
 */
export const useLibraryAssetMultilingual = (assetId) => {
  return useDataFetcher({
    fetcher: () => api.library.fetchOne(assetId),
    queryKey: ["library-asset", assetId, "multilingual"],
    storeValue: true,
    enabled: !!assetId,
  });
};

/**
 * @param {string} projectId
 * @returns {AssetMutateResult}
 */
export const useCreateAsset = (projectId) => {
  return useDataMutator({
    mutator: ({ data }) => api.library.create(projectId, data),
    mutationKey: ["create-library-asset", projectId],
    invalidateKey: ["library-assets", projectId],
  });
};

/**
 * @param {string} projectId
 * @param {string} assetId
 * @returns {AssetMutateResult}
 */
export const useUpdateAsset = (projectId, assetId) => {
  return useDataMutator({
    mutator: ({ data }) => api.library.update(assetId, data),
    mutationKey: ["update-library-asset", assetId],
    invalidateKey: [
      ["library-asset", assetId],
      ["library-assets", projectId],
    ],
  });
};

/**
 * @param {string} projectId
 * @param {string} assetId
 * @returns {AssetMutateResult}
 */
export const useDeleteAsset = (projectId, assetId) => {
  return useDataMutator({
    mutator: () => api.library.delete(assetId),
    mutationKey: ["delete-library-asset", assetId],
    invalidateKey: ["library-assets", projectId],
  });
};
