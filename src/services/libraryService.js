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
 * @returns {AssetsResult}
 */
export const useLibraryAssets = (projectId, params) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.library.fetchAll(projectId, { params, locale }),
    queryKey: ["library-assets", projectId, locale],
  });
};

/**
 * @param {string} projectId
 * @param {string} assetId
 * @returns {AssetsResult}
 */
export const useLibraryAsset = (projectId, assetId) => {
  const locale = useLocale();
  return useDataFetcher({
    fetcher: () => api.library.fetchOne(projectId, assetId, locale),
    queryKey: ["library-asset", projectId, assetId, locale],
  });
};

/**
 * @param {string} projectId
 * @param {string} assetId
 * @returns {AssetResult}
 */
export const useLibraryAssetMultilingual = (projectId, assetId) => {
  return useDataFetcher({
    fetcher: () => api.library.fetchOne(projectId, assetId),
    queryKey: ["library-asset", projectId, assetId, "multilingual"],
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
 * @returns {AssetMutateResult}
 */
export const useUpdateAsset = (projectId, assetId) => {
  return useDataMutator({
    mutator: ({ data }) => api.library.update(projectId, assetId, data),
    mutationKey: ["update-library-asset", projectId, assetId],
    invalidateKey: ["library-asset", projectId, assetId],
  });
};

/**
 * @param {string} projectId
 * @param {string} assetId
 * @returns {AssetMutateResult}
 */
export const useDeleteAsset = (projectId, assetId) => {
  return useDataMutator({
    mutator: () => api.library.delete(projectId, assetId),
    mutationKey: ["delete-library-asset", projectId, assetId],
    invalidateKey: ["library-assets", projectId],
  });
};
