import { PoiAssetListDto } from "./PoiAssetDto";

export class PoiDto {
  static fromApi(data) {
    const { assets, ...restData } = data || {};
    return { ...restData, assets: PoiAssetListDto.fromApi(assets) };
  }

  static toApi(data) {
    const { assets, ...restData } = data || {};
    return { ...restData, assets: PoiAssetListDto.toApi(assets) };
  }
}

export class PoiListDto {
  static fromApi(dataList) {
    return dataList.map(PoiDto.fromApi);
  }

  static toApi(dataList) {
    return dataList.map(PoiDto.toApi);
  }
}
