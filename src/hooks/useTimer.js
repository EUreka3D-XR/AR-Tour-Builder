import { useState, useEffect, useCallback, useRef } from "react";

const useTimer = (initialTime) => {
  const [timer, setTimer] = useState(initialTime);
  const timerId = useRef(null);

  const reset = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    setTimer(initialTime);
  }, [initialTime]);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  return { timer, reset };
};

export default useTimer;
