import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getTourPois = async (tourId, { params: propsParams, locale }) => {
  const url = baseUrls.pois;
  const params = { ...propsParams, tourId };
  return fetcher.get(url, { locale, params });
};

const getPoi = async (poiId, locale) => {
  const url = baseUrls.poi(poiId);
  return fetcher.get(url, { locale });
};

const createPoi = async (tourId, data, locale) => {
  const url = baseUrls.pois;
  const fullData = { ...data, tourId };
  return fetcher.post(url, { data: fullData, locale });
};

const updatePoi = async (poiId, data, locale) => {
  const url = baseUrls.poi(poiId);
  return fetcher.put(url, { data, locale });
};

const deletePoi = async (poiId) => {
  const url = baseUrls.poi(poiId);
  return fetcher.delete(url);
};

export const poisApi = {
  fetchAll: getTourPois,
  fetchOne: getPoi,
  create: createPoi,
  update: updatePoi,
  delete: deletePoi,
};
