import { useEffect, useMemo } from "react";
import { useParams } from "react-router";

import { useProjectTour } from "@/services/toursService";
import { useAvailableLocalesProvider } from "../locales/AvailableLocalesContext";
import { TourContext } from "./TourContext";

export const TourProvider = ({ children }) => {
  const { projectId, tourId } = useParams();

  const { data, fetchState } = useProjectTour(projectId, tourId);

  const { updateTourLocales } = useAvailableLocalesProvider();

  useEffect(() => {
    if (fetchState.isSuccess && data) {
      updateTourLocales(data.locales);
    }
  }, [fetchState.isSuccess, data, updateTourLocales]);

  const value = useMemo(
    () => ({
      tour: data,
      fetchState,
    }),
    [fetchState, data],
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};
