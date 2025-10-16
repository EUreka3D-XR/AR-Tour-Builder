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

export const usersApi = {
  fetchOne: getUser,
  fetchProjectUsers: getProjectUsers,
};
