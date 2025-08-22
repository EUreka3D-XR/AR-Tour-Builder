import { useParams } from "react-router";
import OverviewStats from "@/pages/dashboard/sections/OverviewStats";
import { useProject } from "@/services/projectsService";
import { styled } from "@mui/material";

import Members from "./sections/Members";
import ProjectBanner from "./sections/ProjectBanner";
import ToursStats from "./sections/ToursStats";

const ContainerStyled = styled("div")(({ theme }) => ({
  paddingBottom: theme.spacing(8),
  "& .stats-sections": {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: "grid",
    gap: theme.spacing(4),
    "&.equal": {
      gridTemplateColumns: "1fr 1fr",
    },
    "&.one-two-thirds": {
      gridTemplateColumns: "1fr 2fr",
    },
  },
}));

function DashboardPage() {
  const { projectId } = useParams();

  const { data: project } = useProject(projectId);

  return (
    <ContainerStyled>
      <ProjectBanner project={project} />
      <div className="stats-sections one-two-thirds">
        <OverviewStats
          totalViews={2812}
          viewsThisMonth={512}
          growthRate={18}
          completionRate={75}
        />
        <ToursStats />
      </div>
      <div className="stats-sections equal">
        <Members projectId={projectId} />
      </div>
    </ContainerStyled>
  );
}

export default DashboardPage;
