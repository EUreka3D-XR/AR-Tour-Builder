import { useMemo } from "react";
import { useParams } from "react-router";

import { useProjectTourMultilingual } from "@/services/toursService";
import TourPage from "./page";

const DEFAULT_EMPTY_TOUR = {
  id: null,
  title: {
    locales: {
      en: "Untitled Tour",
      fr: "Visite sans titre",
    },
  },
  description: {
    locales: {
      en: "",
      fr: "",
    },
  },
  duration: 0,
  distance: 0,
  isPublic: false,
  pois: [],
};

function TourPageContainer() {
  const { tourId, projectId } = useParams();

  const { data, fetchState } = useProjectTourMultilingual(projectId, tourId);

  const initialTour = useMemo(() => {
    if (tourId && fetchState.isSuccess && data) {
      return data;
    }
    return DEFAULT_EMPTY_TOUR;
  }, [tourId, fetchState, data]);

  return <TourPage initialTour={initialTour} />;
}

export default TourPageContainer;
