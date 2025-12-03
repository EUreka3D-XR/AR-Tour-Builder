export class ProjectDto {
  static fromApi(data) {
    return { ...data, members: data.groupMembers };
  }

  static toApi(data) {
    return { ...data, groupMembers: data.members };
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
