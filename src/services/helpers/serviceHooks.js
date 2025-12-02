import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
 * @param {boolean} [params.storeValue=false] - Whether to store the fetched value for a certain time and not refetch it.
 * @param {boolean} [params.enabled=true] - Whether the query should be enabled.
 * @returns {FetchResultType<T>} - Object containing fetched data and fetch state.
 */
export const useDataFetcher = ({
  fetcher,
  queryKey,
  storeValue,
  enabled = true,
}) => {
  const { data, ...queryResponse } = useQuery({
    queryKey,
    queryFn: fetcher,
    staleTime: storeValue ? STORE_VALUE_TIME : 0,
    enabled,
  });
  const { fetchState } = useFetchStateHelper(queryResponse);

  return { data, fetchState };
};

/**
 * @template T
 * @typedef {import("@/types/jsdoc-types").MutateResultType<T>} MutateResultType
 */

/**
 * Custom hook for mutating data using react-query
 * @template TData The type of the data passed to the mutator
 * @template TResult The type of the result returned by the mutator's Promise
 * @param {Object} params
 * @param {(data: TData) => Promise<TResult>} params.mutator - The function to mutate data that returns Promise<TResult>
 * @param {String[]} params.mutationKey - The key for the mutation (mutationKey for useMutation).
 * @param {String[]} [params.invalidateKey] - The key for the query to invalidate upon successful mutation.
 * @param {() => void} [params.onSuccess] - Optional callback to execute on successful mutation.
 * @returns {MutateResultType<TResult>}
 */
export const useDataMutator = ({
  mutator,
  mutationKey,
  invalidateKey,
  onSuccess,
}) => {
  const queryClient = useQueryClient();

  const { data, ...mutation } = useMutation({
    mutationKey,
    mutationFn: mutator,
    onSuccess: (data) => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
      if (typeof onSuccess === "function") {
        onSuccess(data);
      }
    },
  });
  const { fetchState } = useFetchStateHelper(mutation);

  return { data, mutate: mutation.mutateAsync, fetchState };
};
