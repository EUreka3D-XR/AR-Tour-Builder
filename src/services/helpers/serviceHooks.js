import { useQuery } from "@tanstack/react-query";

import { useFetchStateHelper } from "@/hooks/useFetchState";

const STORE_VALUE_TIME = 20 * 60 * 1000; // 20 minutes

/**
 * @typedef {import("@/types/jsdoc-types").FetchStateType} FetchStateType
 * @template T
 * @typedef {import("@/types/jsdoc-types").FetchResultType<T>} FetchResultType
 */

/**
 * Custom hook for fetching data using react-query.
 * @template T
 * @param {Object} params
 * @param {() => Promise<T>} params.fetcher - The function to fetch data that returns Promise<T>
 * @param {String[]} params.queryKey - The key for the query (queryKey for useQuery).
 * @param {boolean} [params.shouldStoreValue=false] - Whether to store the fetched value for a certain time and not refetch it.
 * @param {boolean} [params.enabled=true] - Whether the query should be enabled.
 * @returns {FetchResultType<T>} - Object containing fetched data and fetch state.
 */
export const useDataFetcher = ({
  fetcher,
  queryKey,
  shouldStoreValue,
  enabled = true,
}) => {
  const { data, ...queryResponse } = useQuery({
    queryKey,
    queryFn: fetcher,
    staleTime: shouldStoreValue ? STORE_VALUE_TIME : 0,
    enabled,
  });
  const { fetchState } = useFetchStateHelper(queryResponse);

  return { data, fetchState };
};
