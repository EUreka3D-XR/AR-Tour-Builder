import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getPoiAssets = async (projectId, tourId, poiId, { params, locale }) => {
  const url = baseUrls.poiAssets(projectId, tourId, poiId);
  return fetcher.get(url, { locale, params });
};

const getPoiAsset = async (projectId, tourId, poiId, assetId, locale) => {
  const url = baseUrls.poiAsset(projectId, tourId, poiId, assetId);
  return fetcher.get(url, { locale });
};

const createPoiAsset = async (projectId, tourId, poiId, data, locale) => {
  const url = baseUrls.poiAssets(projectId, tourId, poiId);
  return fetcher.post(url, { data, locale });
};

const updatePoiAsset = async (
  projectId,
  tourId,
  poiId,
  assetId,
  data,
  locale,
) => {
  const url = baseUrls.poiAsset(projectId, tourId, poiId, assetId);
  return fetcher.put(url, { data, locale });
};

const deletePoiAsset = async (projectId, tourId, poiId, assetId) => {
  const url = baseUrls.poiAsset(projectId, tourId, poiId, assetId);
  return fetcher.delete(url);
};

export const poiAssetsApi = {
  fetchAll: getPoiAssets,
  fetchOne: getPoiAsset,
  create: createPoiAsset,
  update: updatePoiAsset,
  delete: deletePoiAsset,
};
