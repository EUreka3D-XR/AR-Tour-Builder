import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const login = async (payload) => {
  const url = baseUrls.login;
  return fetcher.post(url, payload);
};

const signup = async (payload) => {
  const url = baseUrls.signup;
  return fetcher.post(url, payload);
};

export const authApi = {
  login,
  signup,
};
