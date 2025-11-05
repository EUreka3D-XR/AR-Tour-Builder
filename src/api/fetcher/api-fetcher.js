import axiosInstance from "./axiosInstance";

/**
 * @typedef {Object} FetcherOptions
 * @property {Object} [params] - Query parameters
 * @property {string} [locale] - Locale for localized requests
 * @property {Function} [fromDTO] - Transform function for response data
 * @property {AbortSignal} [signal] - Abort signal for request cancellation
 */

/**
 * @typedef {Object} FetcherPostOptions
 * @property {Object} [data] - Request body data
 * @property {string} [locale] - Locale for localized response
 * @property {Function} [fromDTO] - Transform function for response data
 * @property {Function} [toDTO] - Transform function for request data
 * @property {AbortSignal} [signal] - Abort signal for request cancellation
 */

/**
 * Generic GET request handler
 * @param {string} url - The endpoint URL
 * @param {FetcherOptions} options - Request options
 * @returns {Promise<any>} The response data
 */
const get = async (url, { params, locale, fromDTO, signal } = {}) => {
  try {
    const response = await axiosInstance.get(url, {
      params: { ...params, locale },
      signal,
    });
    const data = response.data ?? response;
    return fromDTO ? fromDTO(data) : data;
  } catch (error) {
    handleApiError(error, "GET", url);
    throw error;
  }
};

/**
 * POST request handler
 * @param {string} url - The endpoint URL
 * @param {FetcherPostOptions} options - Request options
 * @returns {Promise<any>} The response data
 */
const post = async (url, { data, locale, fromDTO, toDTO, signal } = {}) => {
  try {
    const finalData = toDTO ? toDTO(data) : data;
    const config = { signal };

    // Add locale as query parameter if provided
    if (locale) {
      config.params = { locale };
    }

    const response = await axiosInstance.post(url, finalData, config);
    return fromDTO ? fromDTO(response.data) : response.data;
  } catch (error) {
    handleApiError(error, "POST", url);
    throw error;
  }
};

/**
 * PUT request handler
 * @param {string} url - The endpoint URL
 * @param {FetcherPostOptions} options - Request options
 * @returns {Promise<any>} The response data
 */
const put = async (url, { data, locale, fromDTO, toDTO, signal } = {}) => {
  try {
    const finalData = toDTO ? toDTO(data) : data;
    const config = { signal };

    // Add locale as query parameter if provided
    if (locale) {
      config.params = { locale };
    }

    const response = await axiosInstance.put(url, finalData, config);
    return fromDTO ? fromDTO(response.data) : response.data;
  } catch (error) {
    handleApiError(error, "PUT", url);
    throw error;
  }
};

/**
 * DELETE request handler
 * @param {string} url - The endpoint URL
 * @param {Object} options - Request options
 * @returns {Promise<any>} The response data
 */
const del = async (url, { signal } = {}) => {
  try {
    const response = await axiosInstance.delete(url, { signal });
    return response.data;
  } catch (error) {
    handleApiError(error, "DELETE", url);
    throw error;
  }
};

/**
 * Enhanced error handling with more context
 * @param {Error} error - The axios error
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 */
const handleApiError = (error, method, url) => {
  if (error.name === "AbortError") {
    console.log(`${method} request to ${url} was cancelled`);
    return;
  }

  if (error.response) {
    // Server responded with error status
    console.error(`${method} ${url} failed:`, {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
    });
  } else if (error.request) {
    // Request was made but no response received
    console.error(`${method} ${url} - No response received:`, error.request);
  } else {
    // Something else happened
    console.error(`${method} ${url} - Request setup error:`, error.message);
  }
};

const fetcher = {
  get,
  post,
  put,
  delete: del, // 'delete' is a reserved keyword
};

export default fetcher;
