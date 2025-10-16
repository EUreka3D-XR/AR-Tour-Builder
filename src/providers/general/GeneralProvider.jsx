import { useMemo } from "react";
import { useLocation } from "react-router";

import useNavPaths from "@/hooks/useNavPaths";
import { useToggle } from "@/hooks/useToggle";
import { GeneralContext } from "./GeneralContext";

export const GeneralProvider = ({ children }) => {
  const { isLocationInsideAProject } = useNavPaths();
  const { isOpen: isNavMenuOpen, toggle: toggleNavMenu } = useToggle(true);

  const location = useLocation();
  const isInsideAProject = useMemo(() => {
    // const path = location.pathname.split("/");
    // return path.length > 2 && path[1] === "projects";
    return isLocationInsideAProject(location.pathname);
  }, [location.pathname, isLocationInsideAProject]);

  const value = useMemo(
    () => ({
      isNavMenuOpen,
      isInsideAProject,
      toggleNavMenu,
    }),
    [isNavMenuOpen, isInsideAProject, toggleNavMenu],
  );

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};
