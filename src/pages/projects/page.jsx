import { mockProjects } from "@/api/mocks/projectsMocks";
import { Box, styled, Typography } from "@mui/material";

import ProjectCard from "./_components/ProjectCard";

/**
 * @typedef {import('@/types/jsdoc-types').Project} Project
 */

const ContainerStyled = styled("div")({
  margin: "auto",
  maxWidth: "1200px",
  padding: "2rem",
});

const ProjectsGrid = styled(Box)({
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

function ProjectsPage() {
  return (
    <ContainerStyled>
      <Typography variant="h2" component="h2" gutterBottom>
        My Projects
      </Typography>
      <ProjectsGrid>
        {mockProjects.map((project) => (
          <div key={project.id} className="grid-item">
            <ProjectCard project={project} />
          </div>
        ))}
      </ProjectsGrid>
    </ContainerStyled>
  );
}

export default ProjectsPage;
