import { PoiListDto } from "./PoiDto";

export class TourDto {
  static fromApi(data) {
    const {
      distanceMeters,
      durationMinutes,
      isPublic,
      pois,
      boundingBox,
      ...restData
    } = data || {};
    return {
      ...restData,
      pois: pois ? PoiListDto.fromApi(pois) : undefined,
      status: isPublic ? "published" : "draft",
      boundBox: boundingBox,
      distance: distanceMeters,
      duration: durationMinutes,
    };
  }

  static toApi(data) {
    const { distance, duration, status, pois, boundBox, ...restData } =
      data || {};
    return {
      ...restData,
      pois: pois?.map((poi) => poi.id) ?? [],
      isPublic: status === "published",
      distanceMeters: distance,
      durationMinutes: duration,
      boundingBox: boundBox,
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
