import { useParams } from "react-router";

import { useProject } from "@/services/projectsService";
import ErrorPage from "@/components/error/ErrorPage";
import DashboardLoadingPage from "./loading";
import DashboardPage from "./page";

function DashboardPageContainer() {
  const { projectId } = useParams();

  const { data: project, fetchState } = useProject(projectId);

  if (fetchState.isError) {
    return <ErrorPage hideReload />;
  }
  if (fetchState.isSuccess && !!project) {
    return <DashboardPage project={project} />;
  }

  return <DashboardLoadingPage />;
}

export default DashboardPageContainer;
