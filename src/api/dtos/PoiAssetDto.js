export class PoiAssetDto {
  static fromApi(data) {
    return data;
  }

  static toApi(data) {
    return data;
  }
}

export class PoiAssetListDto {
  static fromApi(dataList) {
    return dataList.map(PoiAssetDto.fromApi);
  }

  static toApi(dataList) {
    return dataList.map(PoiAssetDto.toApi);
  }
}
