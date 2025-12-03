export class LibraryAssetDto {
  static fromApi(data) {
    return data;
  }

  static toApi(data) {
    return data;
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
