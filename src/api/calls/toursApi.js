import { TourDto, TourListDto } from "../dtos/TourDto";
import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getProjectTours = async (projectId, { params: propsParams, locale }) => {
  const url = baseUrls.tours;
  const params = { ...propsParams, projectId };
  return fetcher.get(url, { locale, params, fromDTO: TourListDto.fromApi });
};

const getTour = async (tourId, locale) => {
  const url = baseUrls.tour(tourId);
  return fetcher.get(url, { locale, fromDTO: TourDto.fromApi });
};

const createTour = async (projectId, data) => {
  const url = baseUrls.tours;
  const fullData = { ...data, projectId };
  return fetcher.post(url, {
    data: fullData,
    toDTO: TourDto.toApi,
    fromDTO: TourDto.fromApi,
  });
};

const updateTour = async (tourId, data) => {
  const url = baseUrls.tour(tourId);
  return fetcher.put(url, {
    data,
    toDTO: TourDto.toApi,
    fromDTO: TourDto.fromApi,
  });
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
