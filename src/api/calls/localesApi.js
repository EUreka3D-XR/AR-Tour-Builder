import LocaleCDNDto from "../dtos/LocaleCDNDto";
import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getAllLocales = async (locale) => {
  const url = baseUrls.localesCDN(locale);
  const data = await fetcher.get(url, { fromDTO: LocaleCDNDto.fromApi });
  return data;
};

export const localesApi = {
  fetch: getAllLocales,
};
