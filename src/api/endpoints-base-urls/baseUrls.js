export const baseUrls = {
  projects: "/api/projects",
  project: (projectId) => `/api/projects/${projectId}`,
  library: (projectId) => `/api/projects/${projectId}/library`,
  members: (projectId) => `/api/projects/${projectId}/members`,
  users: "/api/users",
  tours: (projectId) => `/api/projects/${projectId}/tours`,
  tour: (projectId, tourId) => `/api/projects/${projectId}/tours/${tourId}`,
  pois: (projectId, tourId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois`,
};
