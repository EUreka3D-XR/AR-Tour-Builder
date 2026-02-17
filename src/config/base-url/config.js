export const config = {
  apiBaseUrl:
    window.RUNTIME_CONFIG?.VITE_API_BASE_URL ??
    import.meta.env.VITE_API_BASE_URL ??
    "",
};
