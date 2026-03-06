# EGI User Revocation — Problem & Options

## The Problem

When a user logs in via EGI Check-in, the Eureka backend creates a Django session token and returns it to the frontend. From that point on, Eureka uses its own token for authentication — it no longer talks to EGI on every request.

This creates a gap: if an EGI administrator **blocks, removes, or suspends** a user in EGI Check-in, Eureka will not know about it. The user's Django token remains valid and they continue to have full access until the token expires or is manually invalidated.

---

## Options

### Option 1 — Poll `/me` from the frontend

The frontend periodically calls `/me` (e.g. every 5 minutes). The backend re-validates the user's EGI status on each call and returns a `401` if the user has been revoked.

**How it works:**
```
every 5 min: GET /api/auth/me
  backend checks EGI → user revoked → return 401
  frontend receives 401 → clear token → redirect to login
```

**Pros:**
- Simple to implement on both frontend and backend
- No changes to EGI configuration

**Cons:**
- Up to 5 minutes of lag before revocation is enforced
- Wastes resources when the user is idle
- Does not work if the user's browser tab is closed

---

### Option 2 — Validate on every API call

The backend calls EGI's token introspection or userinfo endpoint on every incoming request to verify the user is still active.

**Pros:**
- Revocation is enforced immediately on the next action
- No frontend changes needed

**Cons:**
- Adds latency to every API call
- EGI becomes a dependency for every request — if EGI is slow or down, so is Eureka
- EGI may rate-limit introspection calls

---

### Option 3 — Short-lived Django tokens with silent refresh *(recommended)*

Instead of issuing a long-lived Django token, the backend issues tokens with a short TTL (e.g. 15–30 minutes). Before the token expires, the frontend silently calls a `/refresh` endpoint. The backend only re-validates with EGI at refresh time, not on every request.

**How it works:**
```
login:   backend issues token with TTL=30min, returns expiry timestamp
t=25min: frontend silently calls POST /api/auth/refresh
         backend re-validates user with EGI
         if revoked → return 401 → frontend clears token → redirect to login
         if valid   → issue new token with TTL=30min
```

**Pros:**
- Re-validation happens regularly without polling noise
- EGI is only contacted on refresh, not on every API call
- Industry standard pattern (similar to JWT access/refresh token pairs)
- Max lag = token TTL (configurable)

**Cons:**
- Requires backend changes to support token expiry and a refresh endpoint
- Requires frontend to track token expiry and trigger refresh proactively

---

### Option 4 — Validate only on sensitive actions

The backend re-validates with EGI only on write operations or sensitive actions (create, update, delete), not on reads.

**Pros:**
- No performance impact on read-heavy workloads
- Simple to implement selectively with a middleware/decorator

**Cons:**
- A revoked user can still read data until they perform a write action
- Inconsistent enforcement depending on usage patterns

---

### Option 5 — OIDC Back-Channel Logout *(most robust)*

EGI Check-in sends a logout notification directly to the Eureka backend when a user is revoked or logs out. The backend immediately invalidates that user's token.

**How it works:**
```
EGI admin revokes user
  → EGI sends POST to https://eureka-backend.example.com/api/auth/backchannel-logout
  → backend receives logout token, identifies the user, invalidates their Django token
  → next frontend request returns 401 → redirect to login
```

**Pros:**
- Instantaneous — revocation is enforced the moment EGI processes it
- No polling, no overhead on regular API calls
- Defined by the OIDC standard (OpenID Connect Back-Channel Logout 1.0)

**Cons:**
- Requires the EGI client registration to have back-channel logout configured
- Requires the backend to expose a public webhook endpoint
- Requires confirming EGI Check-in supports this for your client type

---

## Comparison

| Option | Revocation lag | Backend complexity | Frontend complexity | EGI dependency on requests |
|--------|---------------|-------------------|--------------------|-----------------------------|
| 1 — Frontend polling | Up to N minutes | Low | Low | No |
| 2 — Validate every call | Near zero | Medium | None | Yes (every call) |
| 3 — Short-lived tokens | Up to TTL (e.g. 30min) | Medium | Low | No |
| 4 — Sensitive actions only | Until next write | Low | None | No |
| 5 — Back-channel logout | Near zero | Medium | None | No |

---

## Recommendation

**Short-term:** Implement **Option 1** (frontend polling every 5 minutes) as it requires minimal changes and is good enough for most revocation scenarios.

**Long-term:** Migrate to **Option 3** (short-lived tokens) combined with **Option 5** (back-channel logout) if EGI supports it for your client:
- Short-lived tokens handle the common case (regular re-validation) automatically
- Back-channel logout handles the "admin revokes user" case immediately with zero overhead

The first step is to check with the EGI Check-in team whether back-channel logout is available for your registered client.
