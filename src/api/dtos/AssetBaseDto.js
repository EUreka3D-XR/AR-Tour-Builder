export class AssetBaseDto {
  static fromApi(data) {
    const { url, ...restData } = data || {};
    return {
      ...restData,
      contentUrl: url,
    };
  }

  static toApi(data) {
    const { contentUrl, georeference, isGeoreferenced, ...restData } =
      data || {};

    const georeferenceFinal = isGeoreferenced ? georeference : null;
    return {
      ...restData,
      georeference: georeferenceExists(georeferenceFinal)
        ? georeferenceFinal
        : null,
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
