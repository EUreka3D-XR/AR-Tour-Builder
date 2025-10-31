import { useParams } from "react-router";
import clsx from "clsx";
import { Divider, styled } from "@mui/material";

import { useProject, useProjects } from "@/services/projectsService";
import { useGeneralProvider } from "@/providers/general/GeneralContext";
import useNavPaths from "@/hooks/useNavPaths";
import { useToggle } from "@/hooks/useToggle";
import Button from "../button/Button";
import EurekaIcon from "../icon/EurekaIcon";
import Image from "../image/Image";
import Link from "../link/Link";

const ContainerStyled = styled("div")(({ theme }) => ({
  paddingBottom: "1rem",
  "& .add-new-btn": {
    padding: theme.spacing(1),
    margin: theme.spacing(2, 0),
    color: "inherit",
  },
  "& .hidden": {
    display: "none",
  },
}));

const ProjectItem = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.5rem",
  "&.centered": {
    justifyContent: "center",
  },
  "& .thumbnail-container": {
    height: "2.5rem",
  },
  "& .project-thumbnail": {
    height: "100%",
    aspectRatio: 1,
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  },
  "&.selected": {
    "& .thumbnail-container": {
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        left: "-4px",
        top: "50%",
        transform: "translateY(-50%)",
        height: "50%",
        width: "4px",
        borderRadius: "0.5rem 0 0 0.5rem",
        backgroundColor: "#ccc",
      },
    },
  },
});

function NavbarProjects() {
  const { projectId } = useParams();
  const { data: selectedProject } = useProject(projectId);
  const { data: projects } = useProjects();

  const { isNavMenuOpen } = useGeneralProvider();
  const { routes } = useNavPaths();
  const {
    isOpen: isProjectMenuOpen,
    open: openProjectMenu,
    close: closeProjectMenu,
  } = useToggle(false);

  return (
    <ContainerStyled>
      {projects
        ?.filter(
          (project) => isProjectMenuOpen || project.id === selectedProject?.id,
        )
        .map((project) => {
          const isSelected = project.id === selectedProject?.id;
          const clickHandlers = isSelected
            ? {
                onClick: isProjectMenuOpen ? closeProjectMenu : openProjectMenu,
              }
            : {
                to: routes.projects.one(project.id),
                onClick: isProjectMenuOpen ? closeProjectMenu : openProjectMenu,
              };
          return (
            <ProjectItem
              key={project.id}
              className={clsx("project-item", {
                selected: isSelected,
                centered: !isNavMenuOpen,
              })}
              {...clickHandlers}
            >
              <span className="thumbnail-container">
                <Image
                  src={project.thumbnail}
                  alt="project-thumbnail"
                  className="project-thumbnail"
                />
              </span>
              <span
                className={clsx("project-name", "text-truncate", {
                  hidden: !isNavMenuOpen,
                })}
              >
                {project.title}
              </span>
            </ProjectItem>
          );
        })}
      <Button
        href={routes.projects.new}
        startIcon={<EurekaIcon name="add" fontSize="large" />}
        variant="text"
        isFullwidth
        className="add-new-btn"
      >
        <span className={clsx({ hidden: !isNavMenuOpen })}>
          Create new project
        </span>
      </Button>
      <Divider />
    </ContainerStyled>
  );
}

export default NavbarProjects;
