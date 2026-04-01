import { api } from "@/api";

import { useDataFetcher, useDataMutator } from "./helpers/serviceHooks";

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
    enabled: !!projectId,
    storeValue: true,
  });
};

/**
 * @param {string} userId
 * @returns {UserResult}
 */
export const useUser = (userId) => {
  return useDataFetcher({
    fetcher: () => api.users.fetchOne(userId),
    enabled: !!userId,
    queryKey: ["users", userId],
  });
};

/**
 * @returns {UsersResult}
 */
export const useAllUsers = () => {
  return useDataFetcher({
    fetcher: () => api.users.fetchAll(),
    queryKey: ["users"],
    storeValue: true,
  });
};

/**
 * @param {string} projectId
 */
export const useAddProjectMember = (projectId) => {
  return useDataMutator({
    mutator: ({ userIdentifier }) =>
      api.users.addProjectMember(projectId, userIdentifier),
    mutationKey: ["members", "add", projectId],
    invalidateKey: ["members", projectId],
  });
};

export const useUpdateMe = () => {
  return useDataMutator({
    mutator: (data) => api.users.updateMe(data),
    mutationKey: ["me", "update"],
    invalidateKey: ["profile"],
  });
};

/**
 * @param {string} projectId
 */
export const useRemoveProjectMember = (projectId) => {
  return useDataMutator({
    mutator: ({ userIdentifier }) =>
      api.users.removeProjectMember(projectId, userIdentifier),
    mutationKey: ["members", "remove", projectId],
    invalidateKey: ["members", projectId],
  });
};
