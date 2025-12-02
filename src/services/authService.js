import { api } from "@/api";

import { useDataMutator } from "./helpers/serviceHooks";

// /**
//  * @returns {AssetMutateResult}
//  */
export const useLogin = () => {
  return useDataMutator({
    mutator: (payload) => api.auth.login(payload),
    mutationKey: ["login"],
  });
};

export const useSignup = () => {
  return useDataMutator({
    mutator: (payload) => api.auth.signup(payload),
    mutationKey: ["signup"],
  });
};
