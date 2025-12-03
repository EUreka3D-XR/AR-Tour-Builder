import { PoiListDto } from "./PoiDto";

export class TourDto {
  static fromApi(data) {
    const { distanceMeters, durationMinutes, isPublic, pois, ...restData } =
      data || {};
    return {
      ...restData,
      pois: pois ? PoiListDto.fromApi(pois) : undefined,
      status: isPublic ? "published" : "draft",
      distance: distanceMeters,
      duration: durationMinutes,
    };
  }

  static toApi(data) {
    const { distance, duration, status, pois, ...restData } = data || {};
    return {
      ...restData,
      pois: pois ? PoiListDto.toApi(pois) : undefined,
      isPublic: status === "published",
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
