import { ExternalLinksDto } from "./ExternalLinkDto";
import { PoiAssetListDto } from "./PoiAssetDto";

export class PoiDto {
  static fromApi(data) {
    const {
      assets,
      externalLinks: dataExternalLinks,
      thumbnail,
      thumbnail_url,
      ...restData
    } = data || {};

    const { externalLinks, quizLinks } =
      ExternalLinksDto.fromApi(dataExternalLinks);

    return {
      ...restData,
      assets: PoiAssetListDto.fromApi(assets),
      externalLinks,
      quizLinks,
      thumbnail,
      thumbnailUrl: thumbnail_url,
    };
  }

  static toApi(data) {
    const {
      assets,
      externalLinks: dataExternalLinks,
      quizLinks: dataQuizLinks,
      thumbnail,
      thumbnailUrl,
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
      ...(thumbnail !== undefined && { thumbnail }),
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
