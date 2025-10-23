import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getPoiAssets = async (projectId, tourId, poiId, { params, locale }) => {
  const url = baseUrls.poiAssets(projectId, tourId, poiId);
  return fetcher.get(url, { locale, params });
};

const getPoiAsset = async (projectId, tourId, poiId, assetId, locale) => {
  const url = baseUrls.poiAssets(projectId, tourId, poiId, assetId);
  return fetcher.get(url, { locale });
};

export const assetsApi = {
  fetchAll: getPoiAssets,
  fetchOne: getPoiAsset,
};
