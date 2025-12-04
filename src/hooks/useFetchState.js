import { useCallback, useEffect, useMemo, useState } from "react";

export const FETCH_STATE = {
  IDLE: "idle",
  LOADING: "pending",
  SUCCESS: "success",
  ERROR: "error",
};

export const useFetchState = (initialState) => {
  const [state, setState] = useState(initialState ?? FETCH_STATE.IDLE);
  const [error, setError] = useState();
  const isLoading = useMemo(() => state === FETCH_STATE.LOADING, [state]);
  const isSuccess = useMemo(() => state === FETCH_STATE.SUCCESS, [state]);
  const isError = useMemo(() => state === FETCH_STATE.ERROR, [state]);

  const setToLoading = useCallback(() => {
    setState(FETCH_STATE.LOADING);
  }, []);
  const setToError = useCallback((error) => {
    setError(error);
    setState(FETCH_STATE.ERROR);
  }, []);
  const setToSuccess = useCallback(() => {
    setState(FETCH_STATE.SUCCESS);
  }, []);

  const fetchState = useMemo(
    () => ({
      state,
      error,
      isLoading,
      isSuccess,
      isError,
    }),
    [state, error, isLoading, isSuccess, isError],
  );

  const setFetchState = useMemo(
    () => ({
      toLoading: setToLoading,
      toError: setToError,
      toSuccess: setToSuccess,
    }),
    [setToLoading, setToError, setToSuccess],
  );

  return { fetchState, setFetchState };
};

export const useFetchStateHelper = (
  { error, isPending, isFetching, isError, isSuccess },
  setFetchState,
) => {
  const [allowUpdates, setAllowUpdates] = useState(false);

  const trigger = useCallback(() => {
    setAllowUpdates(true);
  }, []);

  const fetchState = useMemo(
    () => ({
      error,
      isLoading: isPending && isFetching,
      isError,
      isSuccess,
    }),
    [error, isPending, isFetching, isError, isSuccess],
  );

  useEffect(() => {
    if (allowUpdates) {
      setFetchState?.(fetchState);
    }
  }, [fetchState, allowUpdates, setFetchState]);

  return useMemo(() => ({ fetchState, trigger }), [fetchState, trigger]);
};
