import { api } from "@/api";

import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').FetchResultType<string>} EuropeanaZipUrlResult
 */

/**
 * @param {string} europeanaUrl
 * @returns {EuropeanaZipUrlResult}
 */
export const useEuropeanaZipUrl = (europeanaUrl) => {
  return useDataFetcher({
    fetcher: () => api.europeana.fetchZipDownloadUrl(europeanaUrl),
    queryKey: ["europeanaUrl", europeanaUrl],
    enabled: !!europeanaUrl,
  });
};
