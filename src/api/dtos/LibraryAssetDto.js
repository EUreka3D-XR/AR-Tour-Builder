import { AssetBaseDto } from "./AssetBaseDto";

export class LibraryAssetDto {
  static fromApi(data) {
    const newData = AssetBaseDto.fromApi(data);
    return newData;
  }

  static toApi(data) {
    const newData = AssetBaseDto.toApi(data);
    return newData;
  }
}

export class LibraryAssetListDto {
  static fromApi(dataList) {
    return dataList.map(LibraryAssetDto.fromApi);
  }

  static toApi(dataList) {
    return dataList.map(LibraryAssetDto.toApi);
  }
}
