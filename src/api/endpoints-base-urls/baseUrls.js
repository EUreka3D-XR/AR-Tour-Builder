export const baseUrls = {
  projects: "/api/projects",
  project: (projectId) => `/api/projects/${projectId}`,
  library: (projectId) => `/api/projects/${projectId}/library`,
  members: (projectId) => `/api/projects/${projectId}/members`,
  users: "/api/users",
  tours: (projectId) => `/api/projects/${projectId}/tours`,
  tour: (projectId, tourId) => `/api/projects/${projectId}/tours/${tourId}`,
  tourPois: (projectId, tourId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois`,
  tourPoi: (projectId, tourId, poiId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois/${poiId}`,
  pois: (projectId) => `/api/projects/${projectId}/pois`,
  poiAssets: (projectId, tourId, poiId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois/${poiId}/assets`,
  poiAsset: (projectId, tourId, poiId, assetId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois/${poiId}/assets/${assetId}`,
};
