import { PoiDto, PoiListDto } from "../dtos/PoiDto";
import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getTourPois = async (tourId, { params: propsParams, locale }) => {
  const url = baseUrls.pois;
  const params = { ...propsParams, tourId };
  return fetcher.get(url, { locale, params, fromDTO: PoiListDto.fromApi });
};

const getPoi = async (poiId, locale) => {
  const url = baseUrls.poi(poiId);
  return fetcher.get(url, { locale, fromDTO: PoiDto.fromApi });
};

const createPoi = async (tourId, data, locale) => {
  const url = baseUrls.pois;
  const fullData = { ...data, tourId };
  return fetcher.post(url, {
    data: fullData,
    locale,
    toDTO: PoiDto.toApi,
    fromDTO: PoiDto.fromApi,
  });
};

const updatePoi = async (poiId, data, locale) => {
  const url = baseUrls.poi(poiId);
  return fetcher.patch(url, {
    data,
    locale,
    toDTO: PoiDto.toApi,
    fromDTO: PoiDto.fromApi,
  });
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
