export const baseUrls = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  signup: "/api/auth/signup",
  forgotPassword: "/api/auth/forgot-password",
  resetPassword: "/api/auth/reset-password",
  me: "/api/auth/me",
  projects: "/api/projects",
  project: (projectId) => `/api/projects/${projectId}`,
  library: "/api/assets",
  libraryAsset: (assetId) => `/api/assets/${assetId}`,
  members: (projectId) => `/api/projects/${projectId}/members`,
  users: "/api/users",
  tours: (projectId) => `/api/projects/${projectId}/tours`,
  tour: (projectId, tourId) => `/api/projects/${projectId}/tours/${tourId}`,
  tourPois: (projectId, tourId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois`,
  tourPoi: (projectId, tourId, poiId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois/${poiId}`,
  pois: (projectId) => `/api/projects/${projectId}/pois`,
  poi: (projectId, poiId) => `/api/projects/${projectId}/pois/${poiId}`,
  poiAssets: (projectId, tourId, poiId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois/${poiId}/assets`,
  poiAsset: (projectId, tourId, poiId, assetId) =>
    `/api/projects/${projectId}/tours/${tourId}/pois/${poiId}/assets/${assetId}`,
  localesCDN: (locale) => `https://flagcdn.com/${locale}/codes.json`,
};
