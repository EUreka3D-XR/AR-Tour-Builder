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
        console.log(key, value);
        newParams.set(key, "0");
        return;
      }
      newParams.set(key, String(value));
    });

    setSearchParams(newParams);
  };

  return { filterParams, updateParams };
};

export default useDashboardParams;
