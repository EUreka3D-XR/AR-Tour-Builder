import { useMemo } from "react";
import { useParams } from "react-router";

import useProjectLanguages from "@/stores/useProjectLanguages";
import useTourLanguages from "@/stores/useTourLanguages";

const useAvailableLocales = () => {
  const { projectId, tourId } = useParams();
  const { available: availableTourLocales } = useTourLanguages();
  const { available: availableProjectLocales } = useProjectLanguages();

  const available = useMemo(() => {
    if (
      tourId &&
      Array.isArray(availableTourLocales) &&
      availableTourLocales.length > 0
    ) {
      return availableTourLocales;
    }
    if (
      projectId &&
      Array.isArray(availableProjectLocales) &&
      availableProjectLocales.length > 0
    ) {
      return availableProjectLocales;
    }
    return LanguageAllOptions;
  }, [tourId, projectId, availableTourLocales, availableProjectLocales]);

  return { available };
};

const LanguageAllOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
];

export default useAvailableLocales;
