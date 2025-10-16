import { api } from "@/api";

import { useDataFetcher } from "./helpers/serviceHooks";

/**
 * @typedef {import('@/types/jsdoc-types').User} User
 * @typedef {import('@/types/jsdoc-types').FetchResultType<User[]>} UsersResult
 * @typedef {import('@/types/jsdoc-types').FetchResultType<User>} UserResult
 */

/**
 * @param {string} locale
 * @returns {UsersResult}
 */
export const useProjectMembers = (projectId) => {
  return useDataFetcher({
    fetcher: () => api.users.fetchProjectUsers(projectId),
    queryKey: ["members", projectId],
  });
};

/**
 * @param {string} userId
 * @returns {UserResult}
 */
export const useUser = (userId) => {
  return useDataFetcher({
    fetcher: () => api.users.fetchOne(userId),
    queryKey: ["users", userId],
  });
};
