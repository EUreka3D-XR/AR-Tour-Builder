import axios from "axios";

import { localeStorageAPI } from "@/utils/local-storage-utils";
import { transformKeysToCamel, transformKeysToSnake } from "./transformKeys";

// fix for axios and mirage passthrough issue (see adapter):
// https://github.com/miragejs/miragejs/issues/1006 comment of Jan 20 2025
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  adapter: async (config) => {
    // Combine base URL and endpoint URL
    let url = config.baseURL + config.url;

    // Serialize params and append to URL as query string
    if (config.params) {
      const searchParams = new URLSearchParams();
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes("?") ? "&" : "?") + queryString;
      }
    }

    // Make the fetch request
    return fetch(url, {
      method: config.method?.toUpperCase() || "GET",
      headers: config.headers,
      // body: config.data ? JSON.stringify(config.data) : undefined,
      body: config.data,
      signal: config.signal,
    }).then(async (response) => {
      const data = await response.json();

      // Return in axios response format
      const axiosResponse = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config,
        request: response,
      };

      // Reject promise for non-2xx status codes (like axios does)
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(
          `Request failed with status ${response.status}`,
        );
        error.response = axiosResponse;
        error.config = config;
        return Promise.reject(error);
      }

      return axiosResponse;
    });
  },
});

// Request interceptor to add Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localeStorageAPI.auth.getToken(); // or your token key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Don't transform FormData keys
    const isFormData = config.data instanceof FormData;

    if (
      config &&
      config.method.toLowerCase() !== "get" &&
      config.data &&
      !isFormData
    ) {
      return {
        ...config,
        data: transformKeysToSnake(config.data),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Optional: Response interceptor to handle 401 (unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;

    const shouldApplyCamelCase =
      Boolean(data) && response.config?.responseType !== "blob";

    if (shouldApplyCamelCase) {
      return { ...response, data: transformKeysToCamel(data) };
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear token and redirect to login
      localeStorageAPI.auth.removeToken();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
