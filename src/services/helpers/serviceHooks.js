import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  useFetchStateHelper,
  useMutateStateHelper,
} from "@/hooks/useFetchState";

const STORE_VALUE_TIME = 10; // 10 minutes

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
 * @param {boolean | number} [params.storeValue=false] - Whether to store the fetched value for a certain time and not refetch it.
 * @param {boolean } [params.enabled=true] - Whether the query should be enabled.
 * @returns {FetchResultType<T>} - Object containing fetched data and fetch state.
 */
export const useDataFetcher = ({
  fetcher,
  queryKey,
  storeValue = false,
  enabled = true,
}) => {
  const storeValueTime =
    (storeValue === true ? STORE_VALUE_TIME : storeValue) * 60 * 1000;

  const { data, ...queryResponse } = useQuery({
    queryKey,
    queryFn: fetcher,
    staleTime: storeValue ? storeValueTime : 0,
    enabled,
  });
  const { fetchState } = useFetchStateHelper(queryResponse);

  return { data, fetchState };
};

/**
 * @template T
 * @typedef {import("@/types/jsdoc-types").MutationResultType<T>} MutationResultType
 */

/**
 * Custom hook for mutating data using react-query
 * @template TData The type of the data passed to the mutator
 * @template TResult The type of the result returned by the mutator's Promise
 * @param {Object} params
 * @param {(data: TData) => Promise<TResult>} params.mutator - The function to mutate data that returns Promise<TResult>
 * @param {String[]} params.mutationKey - The key for the mutation (mutationKey for useMutation).
 * @param {String[] | String[][]} [params.invalidateKey] - The key(s) for the query/queries to invalidate upon successful mutation. Can be a single key or array of keys.
 * @param {(data: TResult, variables: TData) => void} [params.onSuccess] - Optional callback to execute on successful mutation.
 * @returns {MutationResultType<TResult>}
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
    onSuccess: (data, variables) => {
      if (invalidateKey) {
        // Support both single key and array of keys
        const keysToInvalidate = Array.isArray(invalidateKey[0])
          ? invalidateKey
          : [invalidateKey];

        keysToInvalidate.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      if (typeof onSuccess === "function") {
        onSuccess(data, variables);
      }
    },
  });
  const { fetchState } = useMutateStateHelper(mutation);

  return { data, mutate: mutation.mutateAsync, fetchState };
};
