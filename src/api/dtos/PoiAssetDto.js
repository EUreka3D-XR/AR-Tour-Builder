import { AssetBaseDto } from "./AssetBaseDto";

export class PoiAssetDto {
  static fromApi(data) {
    const newData = AssetBaseDto.fromApi(data);
    return newData;
  }

  static toApi(data) {
    const newData = AssetBaseDto.toApi(data);
    return newData;
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
