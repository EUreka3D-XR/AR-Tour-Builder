import { styled, Typography } from "@mui/material";

import { useProjects } from "@/services/projectsService";
import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";
import ProjectCard from "./_components/ProjectCard";

const ContainerStyled = styled("div")({
  margin: "auto",
  maxWidth: "1200px",
  padding: "2rem",
  "& .header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .subtitle": {
    maxWidth: "600px",
  },
});

const ProjectsGrid = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1.5rem",
  marginTop: "2rem",
  "& .grid-item": {
    flex: "1 1 calc(50% - 0.75rem)",
    minWidth: "300px",
    maxWidth: "500px",
  },
});

const ErrorSection = styled("div")({
  width: "100%",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function ProjectsPage() {
  const { data: projects, fetchState } = useProjects();
  const { routes } = useNavPaths();

  return (
    <ContainerStyled>
      <div className="header">
        <Typography variant="h2" component="h2" gutterBottom>
          My Projects
        </Typography>
        <Button
          variant="filled"
          startIcon={<EurekaIcon name="add" />}
          href={routes.projects.new}
        >
          New Project
        </Button>
      </div>
      <Typography color="textSecondary" className="subtitle">
        Browse and manage your projects. Here you can view details, create new
        projects, and keep track of your progress.
      </Typography>

      {fetchState.isError && (
        <ErrorSection>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Oops! Something went wrong while fetching your projects. Please try
            again later.
          </Typography>
        </ErrorSection>
      )}
      {fetchState.isSuccess && !projects?.length && (
        <ErrorSection>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            You have no projects yet. <br /> Click New Project to create your
            first one.
          </Typography>
        </ErrorSection>
      )}
      <ProjectsGrid>
        {fetchState.isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="grid-item">
              <ProjectCard.Skeleton />
            </div>
          ))}
        {fetchState.isSuccess &&
          Boolean(projects?.length) &&
          projects?.map((project) => (
            <div key={project.id} className="grid-item">
              <ProjectCard project={project} />
            </div>
          ))}
      </ProjectsGrid>
    </ContainerStyled>
  );
}

export default ProjectsPage;
