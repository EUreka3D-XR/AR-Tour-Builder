import { useEffect } from "react";

import { api } from "@/api";

const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Polls /me every 5 minutes for users authenticated via EGI Check-in.
 * If the backend returns 401 (user revoked in EGI), the axios interceptor
 * clears the token and redirects to /auth/login automatically.
 *
 * @param {{ provider?: string } | undefined} user
 */
export function useEGISessionPoller(user) {
  useEffect(() => {
    if (user?.provider !== "egi") return;

    const interval = setInterval(() => {
      api.profile.fetch().catch(() => {
        // 401 is handled globally by the axios interceptor in axiosInstance.js
        // which removes the token and redirects to /auth/login
      });
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [user?.provider]);
}
