import { baseUrls } from "../endpoints-base-urls/baseUrls";
import fetcher from "../fetcher/api-fetcher";

const getAllProjects = () => {
  const url = baseUrls.projects;
  return fetcher.get(url);
};

const getAllProjectsLocalized = (locale) => {
  const url = baseUrls.projects;
  return fetcher.get.localized(url, { locale });
};

getAllProjects.localized = getAllProjectsLocalized;

const getProject = async (projectId) => {
  const url = baseUrls.project(projectId);
  return fetcher.get(url);
};

const getProjectLocalized = (projectId, locale) => {
  const url = baseUrls.project(projectId);
  return fetcher.get.localized(url, { locale });
};

getProject.localized = getProjectLocalized;

export const projectsApi = {
  fetchAll: getAllProjects,
  fetchOne: getProject,
};
