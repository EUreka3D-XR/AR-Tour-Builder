import { useMemo } from "react";

import { useProfile } from "@/services/profileService";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const { data, fetchState } = useProfile();

  const value = useMemo(
    () => ({
      user: data,
      fetchState,
    }),
    [data, fetchState],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
