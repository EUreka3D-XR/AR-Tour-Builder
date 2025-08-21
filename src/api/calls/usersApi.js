import axiosInstance from "../client-instance/axiosInstance";
import { baseUrls } from "../endpoints-base-urls/baseUrls";

const getUser = async (userId) => {
  try {
    const url = `${baseUrls.users}/${userId}`;

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching user with id " + userId + ":", error);
    throw error;
  }
};

const getProjectUsers = async (projectId) => {
  try {
    const url = baseUrls.members(projectId);

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const usersApi = {
  fetchOne: getUser,
  fetchProjectUsers: getProjectUsers,
};
