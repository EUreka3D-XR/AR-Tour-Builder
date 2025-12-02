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

const logout = async () => {
  const url = baseUrls.logout;
  return fetcher.post(url);
};

export const authApi = {
  login,
  logout,
  signup,
};
