import { useQuery } from "@tanstack/react-query";

import { useFetchStateHelper } from "@/hooks/useFetchState";

/**
 * @typedef {Object} FetchStateType
 * @property {any} error
 * @property {boolean} isLoading
 * @property {boolean} isError
 * @property {boolean} isSuccess
 */

/**
 * Custom hook for fetching data using react-query.
 * @param {Object} params
 * @param {Function} params.fetcher - The function to fetch data (queryFn for useQuery).
 * @param {String[]} params.queryKey - The key for the query (queryKey for useQuery).
 * @returns {{ data: unknown, fetchState: FetchStateType }} - Object containing fetched data and fetch state.
 */
export const useDataFetcher = ({ fetcher, queryKey }) => {
  const { data, ...queryResponse } = useQuery({
    queryKey,
    queryFn: fetcher,
  });
  const { fetchState } = useFetchStateHelper(queryResponse);

  return { data, fetchState };
};
