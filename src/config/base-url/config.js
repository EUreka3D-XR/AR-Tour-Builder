const apiBaseUrl =
  window.RUNTIME_CONFIG?.VITE_API_BASE_URL ??
  import.meta.env.VITE_API_BASE_URL ??
  "";

const egiLoginUrl =
  window.RUNTIME_CONFIG?.EGI_LOGIN_URL ?? import.meta.env.EGI_LOGIN_URL ?? "";

const egiClientId =
  window.RUNTIME_CONFIG?.EGI_CLIENT_ID ?? import.meta.env.EGI_CLIENT_ID ?? "";

if (apiBaseUrl) {
  console.log("[config] VITE_API_BASE_URL resolved:");
} else {
  console.warn(
    "[config] VITE_API_BASE_URL is not set — API calls will use relative URLs",
  );
}

export const config = {
  apiBaseUrl,
  egiLoginUrl,
  egiClientId,
};
