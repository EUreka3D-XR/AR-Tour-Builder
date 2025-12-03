import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getAllProjects = (locale) => {
  const url = baseUrls.projects;
  return fetcher.get(url, { locale });
};

const getProject = async (projectId, locale) => {
  const url = baseUrls.project(projectId);
  return fetcher.get(url, { locale });
};

const createProject = async (data, locale) => {
  const url = baseUrls.projects;
  return fetcher.post(url, { data, locale });
};

const updateProject = async (projectId, data, locale) => {
  const url = baseUrls.project(projectId);
  return fetcher.put(url, { data, locale });
};

const deleteProject = async (projectId) => {
  const url = baseUrls.project(projectId);
  return fetcher.delete(url);
};

export const projectsApi = {
  fetchAll: getAllProjects,
  fetchOne: getProject,
  create: createProject,
  update: updateProject,
  delete: deleteProject,
};
