export class TourDto {
  static fromApi(data) {
    return data;
  }

  static toApi(data) {
    return data;
  }
}

export class TourListDto {
  static fromApi(dataList) {
    return dataList.map(TourDto.fromApi);
  }

  static toApi(dataList) {
    return dataList.map(TourDto.toApi);
  }
}
