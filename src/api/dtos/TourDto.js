import { PoiListDto } from "./PoiDto";

export class TourDto {
  static fromApi(data) {
    const { distanceMeters, durationMinutes, pois, ...restData } = data || {};
    return {
      ...restData,
      pois: PoiListDto.fromApi(pois),
      distance: distanceMeters,
      duration: durationMinutes,
    };
  }

  static toApi(data) {
    const { distance, duration, pois, ...restData } = data || {};
    return {
      ...restData,
      pois: PoiListDto.toApi(pois),
      distanceMeters: distance,
      durationMinutes: duration,
    };
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
