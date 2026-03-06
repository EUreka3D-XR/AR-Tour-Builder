// EGI Check-in OpenID Connect helpers (Authorization Code flow, browser-native)

const EGI_CONFIG = {
  authEndpoint: import.meta.env.VITE_EGI_AUTH_ENDPOINT,
  clientId: import.meta.env.VITE_EGI_CLIENT_ID,
  redirectUri: import.meta.env.VITE_EGI_REDIRECT_URI,
  scope: import.meta.env.VITE_EGI_SCOPE,
};

function generateState() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Starts the EGI login flow: saves state, redirects to EGI authorization endpoint.
 */
export function startEGILogin() {
  const state = generateState();
  sessionStorage.setItem("egi_state", state);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: EGI_CONFIG.clientId,
    redirect_uri: EGI_CONFIG.redirectUri,
    scope: EGI_CONFIG.scope,
    state,
  });

  window.location.href = `${EGI_CONFIG.authEndpoint}?${params.toString()}`;
}

/**
 * Called from the /callback page. Validates state and extracts the authorization code.
 * The code is then sent to our backend which handles the token exchange with EGI.
 * @returns {{ code: string }}
 */
export function extractEGICallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const returnedState = params.get("state");
  const error = params.get("error");

  if (error) throw new Error(params.get("error_description") || error);
  if (!code) throw new Error("No authorization code in callback URL.");

  const savedState = sessionStorage.getItem("egi_state");
  sessionStorage.removeItem("egi_state");
  if (savedState && returnedState !== savedState) {
    throw new Error("OAuth state mismatch. Possible CSRF attack.");
  }

  return { code };
}
