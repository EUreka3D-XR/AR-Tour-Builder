import axios from "axios";

// fix for axios and mirage passthrough issue:
// https://github.com/miragejs/miragejs/issues/1006 comment of Jan 20 2025
const axiosInstance = axios.create({
  baseURL: "",
  // A very simple example that will result in resolved passthrough requests in MirageJS
  adapter: async (config) => {
    // Axios separate the base and the one used when you call API.get("/url...")
    const url = config.baseURL + config.url;

    // You want to add more things here if you want to work with other methods or security
    return fetch(url, {
      // Axios adds a lot of extra properties to the original headers, I'm just being lazy here
      headers: config.headers,
    }).then((response) => response.json());
  },
});

export default axiosInstance;
