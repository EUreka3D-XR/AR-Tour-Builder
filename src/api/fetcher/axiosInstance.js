import axios from "axios";

// fix for axios and mirage passthrough issue:
// https://github.com/miragejs/miragejs/issues/1006 comment of Jan 20 2025
const axiosInstance = axios.create({
  baseURL: "",
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
      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config,
        request: response,
      };
    });
  },
});

export default axiosInstance;
