import { useEffect } from "react";

export const useResize = (callback) => {
  useEffect(() => {
    if (typeof callback !== "function") return;
    callback();

    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, [callback]);
};
