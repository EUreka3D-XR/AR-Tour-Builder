import { useMemo } from "react";
import OverviewStats from "@/pages/dashboard/_sections/OverviewStats";
import { styled } from "@mui/material";

import EmptyProjectSection from "./_sections/EmptyProjectSection";
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
    "&.empty-section": {
      marginTop: theme.spacing(16),
    },
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

/**
 *
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').Project} props.project
 * @returns
 */
function DashboardPage({ project }) {
  const projectId = project.id;

  const hasNoMedia = useMemo(() => {
    if (!project) return true;

    return project.totalAssets === 0;
  }, [project]);

  const hasNoTours = useMemo(() => {
    if (!project) return true;

    return project.totalTours === 0;
  }, [project]);

  const isProjectEmpty = hasNoMedia || hasNoTours;

  return (
    <ContainerStyled className="dashboard-main">
      <div className="dash-section">
        <ProjectBanner project={project} />
      </div>
      {isProjectEmpty ? (
        <div className="dash-section empty-section">
          <EmptyProjectSection
            hasNoMedia={hasNoMedia}
            hasNoTours={hasNoTours}
          />
        </div>
      ) : (
        <>
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
        </>
      )}
    </ContainerStyled>
  );
}

export default DashboardPage;
