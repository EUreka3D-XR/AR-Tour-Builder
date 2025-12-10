export class ExternalLinksDto {
  static fromApi(apiExternalLinks) {
    let externalLinks = [];
    let quizLinks = [];

    // Check if externalLinks is a multilingual structure or a simple array
    if (apiExternalLinks) {
      if (apiExternalLinks.locales) {
        // Multilingual structure: {locales: {en: [], fr: [], ...}}
        externalLinks = { locales: {} };
        quizLinks = { locales: {} };

        Object.keys(apiExternalLinks.locales).forEach((locale) => {
          const links = apiExternalLinks.locales[locale] || [];
          externalLinks.locales[locale] = links.filter(
            (link) => link.type === "blog",
          );
          quizLinks.locales[locale] = links.filter(
            (link) => link.type === "quiz",
          );
        });
      } else if (Array.isArray(apiExternalLinks)) {
        // Single locale: just an array
        apiExternalLinks.forEach((link) => {
          if (link.type === "blog") {
            externalLinks.push(link);
          } else if (link.type === "quiz") {
            quizLinks.push(link);
          }
        });
      }
    }

    return { externalLinks, quizLinks };
  }

  static toApi(dataExternalLinks, dataQuizLinks) {
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
        const blogLinks = (dataExternalLinks?.locales?.[locale] || []).map(
          (link) => ({ ...link, type: "blog" }),
        );
        const quizLinksForLocale = (
          dataQuizLinks?.locales?.[locale] || []
        ).map((link) => ({ ...link, type: "quiz" }));

        externalLinks.locales[locale] = [...blogLinks, ...quizLinksForLocale];
      });
    } else if (
      Array.isArray(dataExternalLinks) ||
      Array.isArray(dataQuizLinks)
    ) {
      // Single locale: combine both arrays with type property
      const blogLinks = (dataExternalLinks || []).map((link) => ({
        ...link,
        type: "blog",
      }));
      const quizLinksArray = (dataQuizLinks || []).map((link) => ({
        ...link,
        type: "quiz",
      }));

      externalLinks = [...blogLinks, ...quizLinksArray];
    }

    return externalLinks;
  }
}
