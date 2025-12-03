/**
 * @typedef {Array<import("@/types/jsdoc-types").Locale>} Locales
 * @typedef {import('@/types/jsdoc-types').FetchResultType<Locales>} LocalesResult
 */

import { api } from "@/api";

import { useLocale } from "@/hooks/useLocale";
import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * Fetches all available locales from the API.
 * @param {Object} options
 * @param {boolean} [options.disabled=false] - If true, the fetch will be disabled.
 * @returns {LocalesResult}
 */
export const useAllLocales = ({ disabled = false } = {}) => {
  const locale = useLocale();

  return useDataFetcher({
    fetcher: () => api.locales.fetch(locale),
    queryKey: ["all-locales", locale],
    enabled: !disabled,
    storeValue: 10 * 60 * 1000, // 10 minutes
  });
};
