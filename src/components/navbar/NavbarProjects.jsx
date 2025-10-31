import { useParams } from "react-router";
import clsx from "clsx";
import { Add } from "@mui/icons-material";
import { Divider, styled } from "@mui/material";

import { useProject, useProjects } from "@/services/projectsService";
import { useGeneralProvider } from "@/providers/general/GeneralContext";
import useNavPaths from "@/hooks/useNavPaths";
import { useToggle } from "@/hooks/useToggle";
import Image from "../image/Image";
import Link from "../link/Link";

const ContainerStyled = styled("div")({
  paddingBottom: "1rem",
  "& .add-new-btn": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    padding: "0.5rem",
  },
  "& .hidden": {
    display: "none",
  },
});

const ProjectItem = styled("div")({
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
});

const MainProjectItem = styled(ProjectItem)({
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
      {!isProjectMenuOpen ? (
        <MainProjectItem
          className={clsx("main-project-item", { centered: !isNavMenuOpen })}
          onClick={openProjectMenu}
        >
          <span className="thumbnail-container">
            <Image
              src={selectedProject?.thumbnail}
              alt="project-thumbnail"
              className="project-thumbnail"
            />
          </span>
          <span
            className={clsx("project-name", "text-truncate", {
              hidden: !isNavMenuOpen,
            })}
          >
            {selectedProject?.title}
          </span>
        </MainProjectItem>
      ) : (
        <>
          {projects?.map((project) => (
            <ProjectItem
              key={project.id}
              className={clsx("project-item", {
                centered: !isNavMenuOpen,
              })}
              onClick={closeProjectMenu}
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
          ))}
          <Link to={routes.projects.new} className="add-new-btn">
            <Add />
            <span className={clsx({ hidden: !isNavMenuOpen })}>
              Add new project
            </span>
          </Link>
        </>
      )}
      <Divider />
    </ContainerStyled>
  );
}

export default NavbarProjects;
