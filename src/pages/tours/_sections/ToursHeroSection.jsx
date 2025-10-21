import { useParams } from "react-router";
import { styled, Typography } from "@mui/material";

import { useProject } from "@/services/projectsService";
import RouterBreadcrumbs from "@/components/breadcrumbs/RouterBreadcrumbs";
import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 3, 3),
  maxWidth: "700px",
  "& .top-row": {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(2),
    "& .title": {
      fontWeight: 600,
    },
  },
  "& .subtitle": {
    marginTop: theme.spacing(2),
  },
}));

function ToursHeroSection() {
  const { routes } = useNavPaths();
  const { projectId } = useParams();
  const { data: project, fetchState } = useProject(projectId);

  return (
    <ContainerStyled>
      <RouterBreadcrumbs
        projectTitle={project?.title}
        fetchState={fetchState}
      />
      <div className="top-row">
        <Typography variant="h2" component="h1" className="title">
          Project Tours
        </Typography>
        <Button
          href={routes.tours.new}
          variant="text"
          startIcon={<EurekaIcon name="add" />}
        >
          Create New Tour
        </Button>
      </div>
      <Typography className="subtitle">
        Manage and organize immersive cultural heritage experiences. Create
        guided tours, add points of interest, and publish interactive
        archaeological journeys for your visitors.
      </Typography>
    </ContainerStyled>
  );
}

export default ToursHeroSection;
