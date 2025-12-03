import { TourListDto } from "./TourDto";

export class ProjectDto {
  static fromApi(data) {
    const { groupMembers, tours, ...restData } = data || {};
    return {
      ...restData,
      tours: TourListDto.fromApi(tours),
      members: groupMembers,
    };
  }

  static toApi(data) {
    const { members, tours, ...restData } = data || {};
    return {
      ...restData,
      groupMembers: members,
      tours: TourListDto.toApi(tours),
    };
  }
}

export class ProjectListDto {
  static fromApi(dataList) {
    return dataList.map(ProjectDto.fromApi);
  }

  static toApi(dataList) {
    return dataList.map(ProjectDto.toApi);
  }
}
