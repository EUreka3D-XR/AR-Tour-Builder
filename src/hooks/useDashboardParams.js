import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useDashboardParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = useMemo(() => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    return {
      ...params,
      page: params.page ? Number(params.page) : 0,
      pageSize: params.pageSize ? Number(params.pageSize) : 10,
    };
  }, [searchParams]);

  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value == null || value === "" || value === "all") {
        newParams.delete(key);
        return;
      }
      if (key === "page" && Number(value || 0) < 0) {
        newParams.set(key, "0");
        return;
      }
      newParams.set(key, String(value));
    });

    setSearchParams(newParams);
  };

  const resetParams = () => {
    const currentParams = new URLSearchParams(searchParams);
    const newParams = new URLSearchParams(searchParams);

    currentParams.forEach((_, key) => {
      if (key !== "page" && key !== "pageSize" && key !== "viewMode") {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  return { filterParams, searchParams, updateParams, resetParams };
};

export default useDashboardParams;
