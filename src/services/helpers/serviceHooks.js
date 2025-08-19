import { useQuery } from "@tanstack/react-query";

import { useFetchStateHelper } from "@/hooks/useFetchState";

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
 * @returns {FetchResultType<T>} - Object containing fetched data and fetch state.
 */
export const useDataFetcher = ({ fetcher, queryKey }) => {
  const { data, ...queryResponse } = useQuery({
    queryKey,
    queryFn: fetcher,
  });
  const { fetchState } = useFetchStateHelper(queryResponse);

  return { data, fetchState };
};
