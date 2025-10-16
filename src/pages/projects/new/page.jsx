import { styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import useNavPaths from "@/hooks/useNavPaths";
import ProjectForm from "../_components/ProjectForm";

const ContainerStyled = styled("div")({
  margin: "auto",
  maxWidth: "1200px",
  padding: "2rem",
  "& .header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .actions": {
      display: "flex",
      gap: "1rem",
    },
  },
  "& .subtitle": {
    maxWidth: "600px",
  },
  "& .project-form-section": {
    marginTop: "2rem",
  },
});

function NewProjectPage() {
  const { routes } = useNavPaths();
  return (
    <ContainerStyled>
      <div className="header">
        <Typography variant="h2" component="h2" gutterBottom>
          Create New Project
        </Typography>
        <div className="actions">
          <Button href={routes.projects.index}>Cancel</Button>
          <Button variant="filled">Create Project</Button>
        </div>
      </div>
      <Typography color="textSecondary" className="subtitle">
        Start a new project by providing the required details below. Fill out
        the form to set up your project and begin collaborating.
      </Typography>
      <div className="project-form-section">
        <ProjectForm />
      </div>
    </ContainerStyled>
  );
}

export default NewProjectPage;
