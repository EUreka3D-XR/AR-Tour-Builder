export class LinkedAssetDto {
  static fromApi(data) {
    const { url, title } = data || {};

    const titleExists = !checkIfEmptyLocales(title);
    const urlExists = !checkIfEmptyLocales(url);
    return {
      title: titleExists
        ? title
        : {
            locales: {
              en: "",
              fr: "",
            },
          },
      contentUrl: urlExists
        ? url
        : {
            locales: {
              en: "",
              fr: "",
            },
          },
    };
  }

  static toApi(data) {
    const { contentUrl, title } = data || {};

    const titleExists = !checkIfEmptyLocales(title);
    const contentUrlExists = !checkIfEmptyLocales(contentUrl);

    return {
      title: titleExists
        ? title
        : {
            locales: {
              en: "",
              fr: "",
            },
          },
      url: contentUrlExists
        ? contentUrl
        : {
            locales: {
              en: "",
              fr: "",
            },
          },
    };
  }
}

const checkIfEmptyLocales = (item) => {
  if (!item || !item.locales) return true;

  return Object.values(item.locales).length === 0;
};
