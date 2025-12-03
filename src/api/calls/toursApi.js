import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getProjectTours = async (projectId, { params: propsParams, locale }) => {
  const url = baseUrls.tours;
  const params = { ...propsParams, projectId };
  return fetcher.get(url, { locale, params });
};

const getTour = async (tourId, locale) => {
  const url = baseUrls.tour(tourId);
  return fetcher.get(url, { locale });
};

const createTour = async (projectId, data) => {
  const url = baseUrls.tours;
  const fullData = { ...data, projectId };
  return fetcher.post(url, { data: fullData });
};

const updateTour = async (tourId, data) => {
  const url = baseUrls.tour(tourId);
  return fetcher.put(url, { data });
};

const deleteTour = async (tourId) => {
  const url = baseUrls.tour(tourId);
  return fetcher.delete(url);
};

const publishTour = async (tourId, publish) => {
  const endpoint = publish ? "publish" : "unpublish";
  const url = `${baseUrls.tour(tourId)}/${endpoint}`;
  return fetcher.post(url);
};

export const toursApi = {
  fetchAll: getProjectTours,
  fetchOne: getTour,
  create: createTour,
  update: updateTour,
  delete: deleteTour,
  publish: publishTour,
};
