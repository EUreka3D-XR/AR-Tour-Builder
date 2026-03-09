const apiBaseUrl =
  window.RUNTIME_CONFIG?.VITE_API_BASE_URL ??
  import.meta.env.VITE_API_BASE_URL ??
  "";

const egiLoginUrl =
  window.RUNTIME_CONFIG?.VITE_EGI_AUTH_ENDPOINT ??
  import.meta.env.VITE_EGI_AUTH_ENDPOINT ??
  "";

const egiClientId =
  window.RUNTIME_CONFIG?.VITE_EGI_CLIENT_ID ??
  import.meta.env.VITE_EGI_CLIENT_ID ??
  "";

try {
  console.log("[config] All env variables (import.meta.env):", import.meta.env);
} catch (e) {
  console.warn("[config] Could not access import.meta.env:", e);
}
try {
  console.log(
    "[config] Runtime config (window.RUNTIME_CONFIG):",
    window.RUNTIME_CONFIG ?? "not set",
  );
} catch (e) {
  console.warn("[config] Could not access window.RUNTIME_CONFIG:", e);
}

if (apiBaseUrl) {
  console.log("[config] VITE_API_BASE_URL resolved:", apiBaseUrl);
} else {
  console.warn(
    "[config] VITE_API_BASE_URL is not set — API calls will use relative URLs",
    apiBaseUrl,
  );
}

export const config = {
  apiBaseUrl,
  egiLoginUrl,
  egiClientId,
};
