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

const addGroupMember = async (groupId, userIdentifier) => {
  const url = baseUrls.groupMembersAdd(groupId);
  return fetcher.post(url, { data: { user_identifier: userIdentifier } });
};

const removeGroupMember = async (groupId, userIdentifier) => {
  const url = baseUrls.groupMembersRemove(groupId);
  return fetcher.post(url, { data: { user_identifier: userIdentifier } });
};

export const usersApi = {
  fetchOne: getUser,
  fetchProjectUsers: getProjectUsers,
  fetchAll: getAllUsers,
  addGroupMember,
  removeGroupMember,
};
