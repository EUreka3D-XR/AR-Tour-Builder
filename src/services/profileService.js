import { api } from "@/api";

import { useDataFetcher } from "./helpers/serviceHooks";

export const useProfile = () => {
  return useDataFetcher({
    fetcher: () => api.profile.fetch(),
    queryKey: ["profile"],
    storeValue: true,
  });
};
