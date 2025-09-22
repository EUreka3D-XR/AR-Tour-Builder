import { useMemo } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

/**
 * Constructs a set of paths based on a base path.
 * @param {string} base - The base path to construct from.
 */
const constructPaths = (base) => {
  return {
    all: `${base}/*`,
    index: `${base}`,
    new: `${base}/new`,
    edit: `${base}/edit`,
    one: (id) => `${base}/${id}`,
  };
};

const checkIfInsideAProject = (pathname) =>
  pathname.startsWith("/projects/") && !pathname.includes("/new");

const useNavPaths = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();

  const routes = useMemo(() => {
    // Base paths
    const projectsBase = constructPaths("/projects");
    const authBase = "/auth";

    // Helper function for project-specific routes
    const internalProjectRoute = (route) =>
      projectId ? `${projectsBase.one(projectId)}${route}` : route;

    // Helper function for auth routes
    const internalAuthRoute = (route) => `${authBase}${route}`;

    return {
      home: "/",
      projects: projectsBase,
      tours: constructPaths(internalProjectRoute("/tours")),
      poi: constructPaths(internalProjectRoute("/poi")),
      library: constructPaths(internalProjectRoute("/library")),
      settings: "/settings",
      auth: authBase,
      login: internalAuthRoute("/login"),
      signup: internalAuthRoute("/signup"),
      forgotPassword: internalAuthRoute("/forgot-password"),
      resetPassword: internalAuthRoute("/reset-password"),
    };
  }, [projectId]);

  const navLinks = useMemo(
    () => ({
      home: { label: t("nav_menu.home"), to: routes.home },
      dashboard: {
        label: t("nav_menu.dashboard"),
        to: routes.projects.one(projectId),
      },
      projects: { label: t("nav_menu.projects"), to: routes.projects.index },
      tours: { label: t("nav_menu.tours"), to: routes.tours.index },
      library: { label: t("nav_menu.library"), to: routes.library.index },
    }),
    [routes, projectId, t],
  );

  return {
    routes,
    navLinks,
    isLocationInsideAProject: checkIfInsideAProject,
  };
};

export default useNavPaths;
