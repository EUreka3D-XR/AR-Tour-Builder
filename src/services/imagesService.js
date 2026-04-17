import { api } from "@/api";

import { useDataMutator } from "./helpers/serviceHooks";

/**
 * @returns {{ mutate: (file: File) => Promise<{id: number, url: string}>, fetchState: import('@/types/jsdoc-types').FetchStateType }}
 */
export const useUploadImage = () => {
  return useDataMutator({
    mutator: (file) => api.images.upload(file),
    mutationKey: ["upload-image"],
  });
};
