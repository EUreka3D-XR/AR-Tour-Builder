import { useMemo } from "react";
import { useLocation } from "react-router";
import { Breadcrumbs, styled } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";
import Link from "../link/Link";

const LINK_LABELS = {
  projects: "My Projects",
  tours: "Tours",
  library: "Project's Library",
};

const BreadcrumbsStyled = styled(Breadcrumbs)({
  "& .breadcrumb-link:hover": {
    textDecoration: "underline",
  },
});

/**
 * @typedef {Object} RouterBreadcrumbsProps
 * @property {string} [className] - Optional CSS class name for the breadcrumbs container.
 * @property {string} [projectTitle] - Title of the current project, used for breadcrumbs display.
 * @property {import('@/types/jsdoc-types').FetchStateType} fetchState - Fetch state of the project data.
 */

/**
 * RouterBreadcrumbs component for displaying breadcrumbs based on the current route.
 * @param {RouterBreadcrumbsProps} props - Props for the component.
 * @returns {JSX.Element} The rendered breadcrumbs component.
 */
function RouterBreadcrumbs({ className, projectTitle, fetchState }) {
  const location = useLocation();

  const links = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const navTo = `/${segments.slice(0, index + 1).join("/")}`;
      let linkLabel = LINK_LABELS[segment] || segment;

      if (index > 0) {
        if (
          segments[index - 1] === "projects" &&
          fetchState.isSuccess &&
          projectTitle
        ) {
          linkLabel = projectTitle;
        }
      }
      return {
        label: linkLabel,
        to: navTo,
      };
    });
  }, [fetchState, location.pathname, projectTitle]);

  return (
    <BreadcrumbsStyled
      className={className}
      separator={<EurekaIcon name="breadcrumb" />}
    >
      {links.map((link) => (
        <Link key={link.to} to={link.to} className="breadcrumb-link">
          {link.label}
        </Link>
      ))}
    </BreadcrumbsStyled>
  );
}

export default RouterBreadcrumbs;
