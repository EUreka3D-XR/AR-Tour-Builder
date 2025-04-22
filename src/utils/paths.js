import { t } from "i18next";

const constructPaths = (base) => {
  return {
    index: base,
    new: `${base}/new`,
    id: {
      static: `${base}/:id`,
      dynamic: (id) => `${base}/${id}`,
    },
  };
};

export const paths = {
  home: "/",
  projects: constructPaths("/projects"),
  tours: constructPaths("/tours"),
  poi: constructPaths("/poi"),
  library: constructPaths("/library"),
};

export const dynamicPath = (path, id) => `${path}/${id}`;

export const navPaths = {
  home: { label: t("nav_menu.home"), to: paths.home },
  projects: { label: t("nav_menu.projects"), to: paths.projects.index },
  tours: { label: t("nav_menu.tours"), to: paths.tours.index },
  library: { label: t("nav_menu.library"), to: paths.library.index },
};
