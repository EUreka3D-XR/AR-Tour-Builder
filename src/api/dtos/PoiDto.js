import { ExternalLinksDto } from "./ExternalLinkDto";
import { PoiAssetListDto } from "./PoiAssetDto";

export class PoiDto {
  static fromApi(data) {
    const {
      assets,
      externalLinks: dataExternalLinks,
      ...restData
    } = data || {};

    const { externalLinks, quizLinks } =
      ExternalLinksDto.fromApi(dataExternalLinks);

    return {
      ...restData,
      assets: PoiAssetListDto.fromApi(assets),
      externalLinks,
      quizLinks,
    };
  }

  static toApi(data) {
    const {
      assets,
      externalLinks: dataExternalLinks,
      quizLinks: dataQuizLinks,
      ...restData
    } = data || {};

    const externalLinks = ExternalLinksDto.toApi(
      dataExternalLinks,
      dataQuizLinks,
    );

    return {
      ...restData,
      assets: PoiAssetListDto.toApi(assets),
      ...(externalLinks && { externalLinks }),
    };
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
