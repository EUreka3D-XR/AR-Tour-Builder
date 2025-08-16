import axiosInstance from "../client-instance/axiosInstance";
import { baseUrls } from "../endpoints-base-urls/baseUrls";

const getAllProjects = async () => {
  try {
    const url = baseUrls.projects;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getProject = async (projectId) => {
  try {
    const url = baseUrls.projects(projectId);
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const projectsApi = {
  fetchAll: getAllProjects,
  fetchOne: getProject,
};
