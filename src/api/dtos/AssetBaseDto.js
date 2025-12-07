export class AssetBaseDto {
  static fromApi(data) {
    const { url, coordinates, ...restData } = data || {};
    return {
      ...restData,
      georeference: coordinates,
      isGeoreferenced: !!coordinates,
      contentUrl: url,
    };
  }

  static toApi(data) {
    const { contentUrl, georeference, ...restData } = data || {};
    return {
      ...restData,
      url: contentUrl,
      coordinates: georeference,
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
