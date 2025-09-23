import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getLibrary = async (projectId, locale) => {
  const url = baseUrls.library(projectId);
  return fetcher.get(url, { locale });
};

export const libraryApi = {
  fetchAll: getLibrary,
};
