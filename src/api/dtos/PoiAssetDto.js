import { AssetBaseDto } from "./AssetBaseDto";

export class PoiAssetDto {
  static fromApi(data) {
    const newData = AssetBaseDto.fromApi(data);
    const { arPlacement, priority, ...restData } = newData || {};

    return {
      ...restData,
      isGroundPlaced: arPlacement === "ground",
      priority,
      isPrimary: priority === "high",
    };
  }

  static toApi(data) {
    const newData = AssetBaseDto.toApi(data);
    return {
      ...newData,
      arPlacement: data.isGroundPlaced ? "ground" : "free",
    };
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
