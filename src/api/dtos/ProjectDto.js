export class ProjectDto {
  static fromApi(data) {
    return data;
  }

  static toApi(data) {
    return data;
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
