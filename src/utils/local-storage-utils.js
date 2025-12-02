const AUTH_TOKEN_KEY = "authToken";

/**
 * Save auth token to localStorage
 * @param {string} token - The authentication token
 */
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

/**
 * Retrieve auth token from localStorage
 * @returns {string | null} The authentication token or null if not found
 */
const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Remove auth token from localStorage
 */
const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Check if user is authenticated (has a token)
 * @returns {boolean} True if auth token exists
 */
const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export const localeStorageAPI = {
  auth: {
    setToken: setAuthToken,
    getToken: getAuthToken,
    removeToken: removeAuthToken,
    isAuthenticated,
  },
};
