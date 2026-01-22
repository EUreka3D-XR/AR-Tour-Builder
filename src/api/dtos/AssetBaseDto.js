export class AssetBaseDto {
  static fromApi(data) {
    const { url, ...restData } = data || {};
    return {
      ...restData,
      contentUrl: url,
    };
  }

  static toApi(data) {
    const { contentUrl, georeference, ...restData } = data || {};
    return {
      ...restData,
      georeference: georeferenceExists(georeference) ? georeference : null,
      url: contentUrl,
    };
  }
}

export class LibraryAssetListDto {
  static fromApi(dataList) {
    return dataList.map(AssetBaseDto.fromApi);
  }

  static toApi(dataList) {
    return dataList.map(AssetBaseDto.toApi);
  }
}

/**
 *
 * @param {import("@/types/jsdoc-types").Georeference} georeference
 * @returns
 */
const georeferenceExists = (georeference) => {
  const doesNotExist =
    !georeference ||
    !georeference.coordinates ||
    georeference.coordinates.lat == null ||
    georeference.coordinates.lat === "" ||
    georeference.coordinates.long == null ||
    georeference.coordinates.long === "";

  return !doesNotExist;
};
