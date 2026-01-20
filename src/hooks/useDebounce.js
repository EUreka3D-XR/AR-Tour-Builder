import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "@mui/material";

export const useDebouncedState = (initialValue = "", delay = 500) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return [debouncedValue, setValue];
};

export const useDebouncedEffect = (effect, deps, delay = 500) => {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(setTimeout(effect, delay));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useDebouncedCallback = (callback, delay = 300) => {
  return useMemo(() => debounce(callback, delay), [delay]);
};

export const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
