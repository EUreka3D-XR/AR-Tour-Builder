import { api } from "@/api";

import { localeStorageAPI } from "@/utils/local-storage-utils";
import { useDataMutator } from "./helpers/serviceHooks";

// /**
//  * @returns {AssetMutateResult}
//  */
export const useLogin = () => {
  return useDataMutator({
    mutator: (payload) => api.auth.login(payload),
    mutationKey: ["login"],
    onSuccess: (data) => {
      localeStorageAPI.auth.setToken(data.token);
      console.log(data);
    },
  });
};

export const useSignup = () => {
  return useDataMutator({
    mutator: (payload) => api.auth.signup(payload),
    mutationKey: ["signup"],
    onSuccess: (data) => {
      localeStorageAPI.auth.setToken(data.token);
    },
  });
};

export const useLogout = () => {
  return useDataMutator({
    mutator: () => api.auth.logout(),
    mutationKey: ["logout"],
    invalidateKey: ["profile"],
  });
};
