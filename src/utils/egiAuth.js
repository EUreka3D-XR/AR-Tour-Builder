// EGI Check-in OpenID Connect helpers (Authorization Code flow, browser-native)

import { config } from "@/config/base-url/config";

const redirectUri = `${window.location.origin}/egi-login`;

const EGI_CONFIG = {
  authEndpoint: config.egiLoginUrl,
  code: "code",
  clientId: config.egiClientId,
  redirectUri: redirectUri,
  scope: "openid profile email",
  codeChallengeMethod: "S256",
};

function generateState() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Starts the EGI login flow: saves state, redirects to EGI authorization endpoint.
 */
export async function startEGILogin() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem("egi_state", state);
  sessionStorage.setItem("egi_code_verifier", codeVerifier);

  const params = new URLSearchParams({
    response_type: EGI_CONFIG.code,
    client_id: EGI_CONFIG.clientId,
    redirect_uri: EGI_CONFIG.redirectUri,
    scope: EGI_CONFIG.scope,
    code_challenge_method: EGI_CONFIG.codeChallengeMethod,
    code_challenge: codeChallenge,
    state,
  });

  // URLSearchParams encodes spaces as '+', but OIDC requires '%20'
  const queryString = params.toString().replace(/\+/g, "%20");

  console.log(
    "Redirecting to EGI login page...",
    `${EGI_CONFIG.authEndpoint}?${queryString}`,
  );
  // return;

  window.location.href = `${EGI_CONFIG.authEndpoint}?${queryString}`;
}

/**
 * Called from the /callback page. Validates state and extracts the authorization code.
 * The code is then sent to our backend which handles the token exchange with EGI.
 * @returns {{ code: string, state: string }}
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

  return { code, state: returnedState };
}
