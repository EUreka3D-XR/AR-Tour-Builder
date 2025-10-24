import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getTourPois = async (projectId, tourId, { params, locale }) => {
  const url = baseUrls.tourPois(projectId, tourId);
  return fetcher.get(url, { locale, params });
};

const getPoi = async (projectId, tourId, poiId, locale) => {
  const url = baseUrls.tourPoi(projectId, tourId, poiId);
  return fetcher.get(url, { locale });
};

const createPoi = async (projectId, tourId, data, locale) => {
  const url = baseUrls.tourPois(projectId, tourId);
  return fetcher.post(url, { data, locale });
};

const updatePoi = async (projectId, tourId, poiId, data, locale) => {
  const url = baseUrls.pois(projectId, tourId, poiId);
  return fetcher.put(url, { data, locale });
};

const deletePoi = async (projectId, tourId, poiId) => {
  const url = baseUrls.pois(projectId, tourId, poiId);
  return fetcher.delete(url);
};

export const poisApi = {
  fetchAll: getTourPois,
  fetchOne: getPoi,
  create: createPoi,
  update: updatePoi,
  delete: deletePoi,
};
