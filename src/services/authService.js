import { api } from "@/api";
import { useQueryClient } from "@tanstack/react-query";

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

export const useLogout = () => {
  const qc = useQueryClient();

  return useDataMutator({
    mutator: () => api.auth.logout(),
    mutationKey: ["logout"],
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
