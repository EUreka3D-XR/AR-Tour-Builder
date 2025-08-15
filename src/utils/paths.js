import { t } from "i18next";

const constructPaths = (base) => {
  return {
    index: base,
    new: `${base}/new`,
    edit: `${base}/edit`,
    id: {
      static: `${base}/:id`,
      dynamic: (id) => `${base}/${id}`,
    },
  };
};

const checkIfInsideAProject = (pathname) => {
  return pathname.startsWith("/projects/") && !pathname.includes("/new");
};

export const paths = {
  home: "/",
  projects: constructPaths("/projects"),
  tours: constructPaths("/tours"),
  poi: constructPaths("/poi"),
  library: constructPaths("/library"),
  isLocationInsideAProject: checkIfInsideAProject,
};

export const dynamicPath = (path, id) => `${path}/${id}`;

export const navPaths = {
  home: { label: t("nav_menu.home"), to: paths.home },
  projects: { label: t("nav_menu.projects"), to: paths.projects.index },
  tours: { label: t("nav_menu.tours"), to: paths.tours.index },
  library: { label: t("nav_menu.library"), to: paths.library.index },
};
