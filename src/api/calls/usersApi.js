import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getUser = async (userId) => {
  const url = `${baseUrls.users}/${userId}`;
  return fetcher.get(url);
};

const getProjectUsers = async (projectId) => {
  const url = baseUrls.members(projectId);
  return fetcher.get(url);
};

const getAllUsers = async () => {
  const url = baseUrls.users;
  return fetcher.get(url);
};

const addProjectMember = async (projectId, userIdentifier) => {
  const url = baseUrls.projectMembersAdd(projectId);
  return fetcher.post(url, { data: { user_identifier: userIdentifier } });
};

const removeProjectMember = async (projectId, userIdentifier) => {
  const url = baseUrls.projectMembersRemove(projectId);
  return fetcher.post(url, { data: { user_identifier: userIdentifier } });
};

const updateCurrentUser = async (data) => {
  const url = baseUrls.me;
  return fetcher.patch(url, { data });
};

export const usersApi = {
  fetchOne: getUser,
  fetchProjectUsers: getProjectUsers,
  fetchAll: getAllUsers,
  addProjectMember,
  removeProjectMember,
  updateMe: updateCurrentUser,
};
