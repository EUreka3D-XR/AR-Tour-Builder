import axiosInstance from "../client-instance/axiosInstance";
import { baseUrls } from "../endpoints-base-urls/baseUrls";

const getAllProjects = async ({ locale } = {}) => {
  try {
    const url = baseUrls.projects;

    const params = {};
    if (locale) {
      params.locale = locale;
    }
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getProject = async (projectId, { locale } = {}) => {
  try {
    const url = baseUrls.project(projectId);

    const params = {};
    if (locale) {
      params.locale = locale;
    }
    const response = await axiosInstance.get(url, { params });
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
