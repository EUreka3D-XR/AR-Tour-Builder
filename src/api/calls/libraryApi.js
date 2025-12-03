import { LibraryAssetDto, LibraryAssetListDto } from "../dtos/LibraryAssetDto";
import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getLibrary = async (projectId, { params: propsParams, locale }) => {
  const url = baseUrls.library;
  const params = { projectId, ...propsParams };

  return fetcher.get(url, {
    locale,
    params,
    fromDTO: LibraryAssetListDto.fromApi,
  });
};

const getAsset = async (assetId, locale) => {
  const url = baseUrls.libraryAsset(assetId);

  return fetcher.get(url, { locale, fromDTO: LibraryAssetDto.fromApi });
};

const createAsset = async (projectId, data, locale) => {
  const url = baseUrls.library;
  const dataWithProjectId = { ...data, projectId };

  return fetcher.post(url, {
    data: dataWithProjectId,
    locale,
    toDTO: LibraryAssetDto.toApi,
    fromDTO: LibraryAssetDto.fromApi,
  });
};

const updateAsset = async (assetId, data, locale) => {
  const url = baseUrls.libraryAsset(assetId);
  return fetcher.put(url, {
    data,
    locale,
    toDTO: LibraryAssetDto.toApi,
    fromDTO: LibraryAssetDto.fromApi,
  });
};

const deleteAsset = async (assetId) => {
  const url = baseUrls.libraryAsset(assetId);
  return fetcher.delete(url);
};

export const libraryApi = {
  fetchAll: getLibrary,
  fetchOne: getAsset,
  create: createAsset,
  update: updateAsset,
  delete: deleteAsset,
};
