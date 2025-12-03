export class PoiDto {
  static fromApi(data) {
    return data;
  }

  static toApi(data) {
    return data;
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
