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

const createTour = async (projectId, data) => {
  const url = baseUrls.tours(projectId);
  return fetcher.post(url, { data });
};

const updateTour = async (projectId, tourId, data) => {
  const url = baseUrls.tour(projectId, tourId);
  return fetcher.put(url, { data });
};

const deleteTour = async (projectId, tourId) => {
  const url = baseUrls.tour(projectId, tourId);
  return fetcher.delete(url);
};

export const toursApi = {
  fetchAll: getProjectTours,
  fetchOne: getTour,
  create: createTour,
  update: updateTour,
  delete: deleteTour,
};
