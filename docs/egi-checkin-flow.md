# EGI Check-in Authentication Flow

## Overview

EGI Check-in is an OpenID Connect (OIDC) identity provider. The frontend uses the **Authorization Code flow**: the user is redirected to EGI to authenticate, EGI redirects back with a short-lived code, and the frontend passes that code to the Eureka backend which validates it and returns a Django session token.

```
User         Browser (React)         EGI Check-in         Eureka Backend
 |                 |                      |                      |
 | clicks EGI btn  |                      |                      |
 |---------------->|                      |                      |
 |                 | redirect to EGI      |                      |
 |                 |--------------------->|                      |
 |                 |                      |                      |
 |   authenticates with EGI               |                      |
 |--------------------------------------->|                      |
 |                 |                      |                      |
 |                 | redirect to          |                      |
 |                 | /callback?code=xyz   |                      |
 |                 |<---------------------|                      |
 |                 |                      |                      |
 |                 | POST /api/auth/egi { code }                 |
 |                 |-------------------------------------------->|
 |                 |                      |                      |
 |                 |                      | verify code with EGI |
 |                 |                      |<-------------------->|
 |                 |                      |                      |
 |                 |             { token: "django-token" }       |
 |                 |<--------------------------------------------|
 |                 |                      |                      |
 |   navigate to /projects                |                      |
 |<----------------|                      |                      |
```

---

## Step-by-step

### 1. User clicks "Login with EGI"

**File:** `src/pages/auth/_common/EGILoginSection.jsx`
**Function:** `startEGILogin()` in `src/utils/egiAuth.js`

- Generates a random `state` string and saves it in `sessionStorage` (used later to prevent CSRF attacks)
- Builds the EGI authorization URL with the parameters below
- Redirects the browser to EGI

**Authorization request parameters:**

| Parameter       | Value                                 | Source                  |
| --------------- | ------------------------------------- | ----------------------- |
| `response_type` | `code`                                | hardcoded               |
| `client_id`     | EGI-registered client ID              | `EGI_CLIENT_ID`         |
| `redirect_uri`  | e.g. `http://localhost:3000/callback` | `VITE_EGI_REDIRECT_URI` |
| `scope`         | `openid profile email`                | `VITE_EGI_SCOPE`        |
| `state`         | random string                         | generated at runtime    |

---

### 2. User authenticates with EGI

The user logs in on the EGI Check-in page (outside our app). EGI redirects back to our `redirect_uri`:

```
http://localhost:3000/callback?code=AUTH_CODE&state=RANDOM_STATE
```

---

### 3. Callback page handles the redirect

**File:** `src/pages/auth/callback/page.jsx`
**Function:** `extractEGICallback()` in `src/utils/egiAuth.js`

- Reads `code` and `state` from the URL query parameters
- Validates that the returned `state` matches what was saved in `sessionStorage` (CSRF check)
- Passes the `code` to the backend via `useEGILogin()`

If EGI returns an `error` parameter instead of a code, or the state doesn't match, the user is redirected to `/auth/login?egi_error=1`.

---

### 4. Backend validates the code and returns a token

**API call:** `POST /api/auth/egi`
**Payload:** `{ code: "AUTH_CODE" }`

The Eureka Django backend:

1. Receives the authorization code
2. Exchanges it with EGI's token endpoint to verify it is valid
3. Retrieves the user's identity from EGI
4. Creates or retrieves the corresponding Django user
5. Returns a Django session token: `{ token: "..." }`

---

### 5. Token is stored and user is redirected

**File:** `src/services/authService.js` — `useEGILogin()`

The Django token is stored in `localStorage` (same mechanism as email/password login), and the user is navigated to `/projects`.

---

## Environment variables

| Variable                | Description                                     | Example (dev)                                                         |
| ----------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| `EGI_LOGIN_URL`         | EGI authorization endpoint                      | `https://aai-dev.egi.eu/auth/realms/egi/protocol/openid-connect/auth` |
| `EGI_CLIENT_ID`         | Client ID registered in EGI Federation Registry | `e00edd5a-e305-454e-9b2f-af410157a005`                                |
| `VITE_EGI_REDIRECT_URI` | Must match the URI registered with EGI          | `http://localhost:3000/callback`                                      |
| `VITE_EGI_SCOPE`        | Requested OIDC scopes                           | `openid profile email`                                                |

### Switching environments

Change the `EGI_LOGIN_URL` and `VITE_EGI_REDIRECT_URI` variables in the appropriate `.env` file — no code changes needed.

| Environment | Auth endpoint                                                         |
| ----------- | --------------------------------------------------------------------- |
| Development | `https://aai-dev.egi.eu/auth/realms/egi/protocol/openid-connect/auth` |
| Production  | `https://aai.egi.eu/auth/realms/egi/protocol/openid-connect/auth`     |

---

## Relevant files

| File                                         | Role                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/utils/egiAuth.js`                       | `startEGILogin()` — builds redirect URL; `extractEGICallback()` — extracts and validates the code |
| `src/pages/auth/_common/EGILoginSection.jsx` | EGI login button, calls `startEGILogin` on click                                                  |
| `src/pages/auth/callback/page.jsx`           | Callback route handler, sends code to backend                                                     |
| `src/services/authService.js`                | `useEGILogin()` hook — posts code to backend, stores returned token                               |
| `src/api/calls/authApi.js`                   | `egiLogin(code)` — the raw API call                                                               |
| `src/api/endpoints-base-urls/baseUrls.js`    | Backend endpoint: `/api/auth/egi`                                                                 |
| `src/routes/EurekaRoutes.jsx`                | `/callback` route, placed outside the `GuestRoute` guard                                          |
