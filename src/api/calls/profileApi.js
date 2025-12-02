import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getProfile = async () => {
  const url = baseUrls.me;
  return fetcher.get(url);
};

export const profileApi = {
  fetch: getProfile,
};
