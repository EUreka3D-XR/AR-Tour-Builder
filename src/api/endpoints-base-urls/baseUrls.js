export const baseUrls = {
  projects: "/api/projects",
  project: (projectId) => `/api/projects/${projectId}`,
  library: (projectId) => `/api/projects/${projectId}/library`,
  tours: (projectId) => `/api/projects/${projectId}/tours`,
  pois: (projectId, tourId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois`,
};
