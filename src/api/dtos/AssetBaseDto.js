export class AssetBaseDto {
  static fromApi(data) {
    const { url, ...restData } = data || {};
    return { ...restData, contentUrl: url };
  }

  static toApi(data) {
    const { contentUrl, ...restData } = data || {};
    return { ...restData, url: contentUrl };
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
