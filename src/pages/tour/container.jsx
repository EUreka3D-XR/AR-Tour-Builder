import { useParams } from "react-router";

import { useProjectTourMultilingual } from "@/services/toursService";
import ErrorPage from "@/components/error/ErrorPage";
import TourPage from "./page";

function TourPageContainer() {
  const { tourId, projectId } = useParams();

  const { data, fetchState } = useProjectTourMultilingual(projectId, tourId);

  if (fetchState.isError) {
    return <ErrorPage />;
  }
  if (fetchState.isLoading) {
    return <div>Loading...</div>;
  }

  return <TourPage initialTour={data} />;
}

export default TourPageContainer;
