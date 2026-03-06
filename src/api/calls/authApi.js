import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const login = async (data) => {
  const url = baseUrls.login;
  return fetcher.post(url, { data });
};

const signup = async (data) => {
  const url = baseUrls.signup;
  return fetcher.post(url, { data });
};

const egiLogin = async (code) => {
  const url = baseUrls.egiLogin;
  return fetcher.post(url, { data: { code } });
};

const logout = async () => {
  const url = baseUrls.logout;
  return fetcher.post(url);
};

export const authApi = {
  login,
  egiLogin,
  logout,
  signup,
};
