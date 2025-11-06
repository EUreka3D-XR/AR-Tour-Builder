import { useProjectProvider } from "@/providers/project/ProjectContext";
import ErrorPage from "@/components/error/ErrorPage";
import DashboardLoadingPage from "./loading";
import DashboardPage from "./page";

function DashboardPageContainer() {
  const { project, fetchState } = useProjectProvider();

  if (fetchState.isError) {
    return <ErrorPage hideReload />;
  }
  if (fetchState.isSuccess && !!project) {
    return <DashboardPage project={project} />;
  }

  return <DashboardLoadingPage />;
}

export default DashboardPageContainer;
