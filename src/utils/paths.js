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

export const pathsLabeled = [
  { label: t("nav_menu.home"), to: paths.home },
  { label: t("nav_menu.projects"), to: paths.projects.index },
  { label: t("nav_menu.library"), to: paths.library.index },
];
