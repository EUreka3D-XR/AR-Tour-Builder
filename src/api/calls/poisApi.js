import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getTourPois = async (projectId, tourId, { params, locale }) => {
  const url = baseUrls.tourPois(projectId, tourId);
  return fetcher.get(url, { locale, params });
};

const getPoi = async (projectId, tourId, poiId, locale) => {
  const url = baseUrls.pois(projectId, tourId, poiId);
  return fetcher.get(url, { locale });
};

export const poisApi = {
  fetchAll: getTourPois,
  fetchOne: getPoi,
};
