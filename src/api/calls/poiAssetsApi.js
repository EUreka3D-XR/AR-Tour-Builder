import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getPoiAssets = async (poiId, { params: propsParams, locale }) => {
  const url = baseUrls.poiAssets;
  const params = { ...propsParams, poiId };
  return fetcher.get(url, { locale, params });
};

const getPoiAsset = async (assetId, locale) => {
  const url = baseUrls.poiAsset(assetId);
  return fetcher.get(url, { locale });
};

const createPoiAsset = async (poiId, data, locale) => {
  const url = baseUrls.poiAssets;
  const fullData = { ...data, poiId };

  return fetcher.post(url, { data: fullData, locale });
};

const updatePoiAsset = async (assetId, data, locale) => {
  const url = baseUrls.poiAsset(assetId);
  return fetcher.put(url, { data, locale });
};

const deletePoiAsset = async (assetId) => {
  const url = baseUrls.poiAsset(assetId);
  return fetcher.delete(url);
};

export const poiAssetsApi = {
  fetchAll: getPoiAssets,
  fetchOne: getPoiAsset,
  create: createPoiAsset,
  update: updatePoiAsset,
  delete: deletePoiAsset,
};
