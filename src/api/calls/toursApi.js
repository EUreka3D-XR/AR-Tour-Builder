import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getProjectTours = async (projectId, { params, locale }) => {
  const url = baseUrls.tours(projectId);
  return fetcher.get(url, { locale, params });
};

const getTour = async (projectId, tourId, locale) => {
  const url = baseUrls.tour(projectId, tourId);
  return fetcher.get(url, { locale });
};

export const toursApi = {
  fetchAll: getProjectTours,
  fetchOne: getTour,
};
