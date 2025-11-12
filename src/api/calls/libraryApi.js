import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getLibrary = async (projectId, { params, locale }) => {
  const url = baseUrls.library(projectId);

  return fetcher.get(url, { locale, params });
};

const getAsset = async (projectId, assetId, locale) => {
  const url = baseUrls.libraryAsset(projectId, assetId);
  return fetcher.get(url, { locale });
};

const createAsset = async (projectId, data, locale) => {
  const url = baseUrls.library(projectId);
  return fetcher.post(url, { data, locale });
};

const updateAsset = async (projectId, assetId, data, locale) => {
  const url = baseUrls.libraryAsset(projectId, assetId);
  return fetcher.put(url, { data, locale });
};

const deleteAsset = async (projectId, assetId) => {
  const url = baseUrls.libraryAsset(projectId, assetId);
  return fetcher.delete(url);
};

export const libraryApi = {
  fetchAll: getLibrary,
  fetchOne: getAsset,
  create: createAsset,
  update: updateAsset,
  delete: deleteAsset,
};
