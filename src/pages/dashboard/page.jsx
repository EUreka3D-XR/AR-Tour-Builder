import { useParams } from "react-router";
import OverviewStats from "@/pages/dashboard/_sections/OverviewStats";
import { useProject } from "@/services/projectsService";
import { styled } from "@mui/material";

import Members from "./_sections/Members";
import ProjectBanner from "./_sections/ProjectBanner";
import RecentTours from "./_sections/RecentTours";
import ToursStats from "./_sections/ToursStats";

const ContainerStyled = styled("div")(({ theme }) => ({
  paddingBottom: theme.spacing(8),
  "& .dash-section": {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    "&.dash-grid": {
      display: "grid",
      gap: theme.spacing(4),
      "&.equal": {
        gridTemplateColumns: "1fr 1fr",
      },
      "&.one-two-thirds": {
        gridTemplateColumns: "1fr 2fr",
      },
    },
  },
}));

function DashboardPage() {
  const { projectId } = useParams();

  const { data: project } = useProject(projectId);

  return (
    <ContainerStyled>
      <div className="dash-section">
        <ProjectBanner project={project} />
      </div>
      <div className="dash-section dash-grid one-two-thirds">
        <OverviewStats
          totalViews={2812}
          viewsThisMonth={512}
          growthRate={18}
          completionRate={75}
        />
        <ToursStats />
      </div>
      <div className="dash-section dash-grid equal">
        <Members projectId={projectId} />
        <RecentTours projectId={projectId} />
      </div>
    </ContainerStyled>
  );
}

export default DashboardPage;
