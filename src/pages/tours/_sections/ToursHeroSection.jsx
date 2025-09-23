import { useParams } from "react-router";
import { styled, Typography } from "@mui/material";

import { useProject } from "@/services/projectsService";
import RouterBreadcrumbs from "@/components/breadcrumbs/RouterBreadcrumbs";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(3, 4),
  "& .title": {
    marginTop: theme.spacing(2),
    fontWeight: 600,
  },
  "& .subtitle": {
    marginTop: theme.spacing(2),
    maxWidth: "600px",
  },
}));

function ToursHeroSection() {
  const { projectId } = useParams();
  const { data: project, fetchState } = useProject(projectId);

  return (
    <ContainerStyled>
      <RouterBreadcrumbs
        projectTitle={project?.title}
        fetchState={fetchState}
      />
      <Typography variant="h2" component="h1" className="title">
        Project Tours
      </Typography>
      <Typography className="subtitle">
        Manage and organize immersive cultural heritage experiences. Create
        guided tours, add points of interest, and publish interactive
        archaeological journeys for your visitors.
      </Typography>
    </ContainerStyled>
  );
}

export default ToursHeroSection;
