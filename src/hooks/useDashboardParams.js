import { useSearchParams } from "react-router-dom";

const useDashboardParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = {};
  for (const [key, value] of searchParams.entries()) {
    filterParams[key] = value;
  }

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
      if (key !== "page" && key !== "pageSize") {
        newParams.delete(key);
      }
    });

    console.log(newParams.toString());
    setSearchParams(newParams);
  };

  return { filterParams, updateParams, resetParams };
};

export default useDashboardParams;
