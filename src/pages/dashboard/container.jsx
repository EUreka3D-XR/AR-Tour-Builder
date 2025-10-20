import { useParams } from "react-router";

import { useProject } from "@/services/projectsService";
import DashboardLoadingPage from "./loading";
import DashboardPage from "./page";

function DashboardPageContainer() {
  const { projectId } = useParams();

  const { data: project, fetchState } = useProject(projectId);

  if (fetchState.isError) {
    return <div>Error loading project dashboard.</div>;
  }
  if (fetchState.isSuccess && !!project) {
    return <DashboardPage project={project} />;
  }

  return <DashboardLoadingPage />;
}

export default DashboardPageContainer;
