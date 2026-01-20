import { AssetBaseDto } from "./AssetBaseDto";
import { LinkedAssetDto } from "./LinkedAssetDto";

export class PoiAssetDto {
  static fromApi(data) {
    const newData = AssetBaseDto.fromApi(data);
    const { arPlacement, priority, linkedAsset, ...restData } = newData || {};

    return {
      ...restData,
      isGroundPlaced: arPlacement === "ground",
      priority,
      isPrimary: priority === "high",
      linkedAsset: linkedAsset ? LinkedAssetDto.fromApi(linkedAsset) : null,
    };
  }

  static toApi(data) {
    const newData = AssetBaseDto.toApi(data);

    return {
      ...newData,
      linkedAsset: LinkedAssetDto.toApi(data.linkedAsset),
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
