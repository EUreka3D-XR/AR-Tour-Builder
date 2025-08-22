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

export const projectsApi = {
  fetchAll: getAllProjects,
  fetchOne: getProject,
};
