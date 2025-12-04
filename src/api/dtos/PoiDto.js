import { PoiAssetListDto } from "./PoiAssetDto";

export class PoiDto {
  static fromApi(data) {
    const {
      assets,
      externalLinks: dataExternalLinks,
      ...restData
    } = data || {};

    let externalLinks = [];
    let quizLinks = [];

    // Check if externalLinks is a multilingual structure or a simple array
    if (dataExternalLinks) {
      if (dataExternalLinks.locales) {
        // Multilingual structure: {locales: {en: [], fr: [], ...}}
        externalLinks = { locales: {} };
        quizLinks = { locales: {} };

        Object.keys(dataExternalLinks.locales).forEach((locale) => {
          const links = dataExternalLinks.locales[locale] || [];
          externalLinks.locales[locale] = links.filter(
            (link) => link.type === "blog",
          );
          quizLinks.locales[locale] = links.filter(
            (link) => link.type === "quiz",
          );
        });
      } else if (Array.isArray(dataExternalLinks)) {
        // Single locale: just an array
        dataExternalLinks.forEach((link) => {
          if (link.type === "blog") {
            externalLinks.push(link);
          } else if (link.type === "quiz") {
            quizLinks.push(link);
          }
        });
      }
    }

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

    let externalLinks;

    // Check if we have multilingual structure or simple arrays
    if (dataExternalLinks?.locales || dataQuizLinks?.locales) {
      // Multilingual structure
      externalLinks = { locales: {} };
      const allLocales = new Set([
        ...Object.keys(dataExternalLinks?.locales || {}),
        ...Object.keys(dataQuizLinks?.locales || {}),
      ]);

      allLocales.forEach((locale) => {
        externalLinks.locales[locale] = [
          ...(dataExternalLinks?.locales?.[locale] || []),
          ...(dataQuizLinks?.locales?.[locale] || []),
        ];
      });
    } else if (
      Array.isArray(dataExternalLinks) ||
      Array.isArray(dataQuizLinks)
    ) {
      // Single locale: combine both arrays
      externalLinks = [...(dataExternalLinks || []), ...(dataQuizLinks || [])];
    }

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
