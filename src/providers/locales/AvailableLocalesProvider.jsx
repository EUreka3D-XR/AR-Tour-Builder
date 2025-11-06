import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";

import useProjectLanguages from "@/stores/useProjectLanguages";
import useTourLanguages from "@/stores/useTourLanguages";
import { useAllLocales } from "@/services/localesService";
import { AvailableLocalesContext } from "./AvailableLocalesContext";

export const AvailableLocalesProvider = ({ children }) => {
  const [cachedLocalesKeys, setCachedLocalesKeys] = useState({
    scope: null,
    keys: [],
  });

  const { data: allLocales, fetchState } = useAllLocales();
  const isDataFetched = fetchState.isSuccess && Array.isArray(allLocales);

  const { tourId, projectId } = useParams();
  const [searchParams] = useSearchParams();

  const isProjectContext =
    Boolean(searchParams.get("projectForm")) || !!projectId;
  const isTourContext = Boolean(searchParams.get("tourForm")) || !!tourId;

  const { available: availableTourLocales, setLanguages: setTourLanguages } =
    useTourLanguages();
  const {
    available: availableProjectLocales,
    setLanguages: setProjectLanguages,
  } = useProjectLanguages();

  useEffect(() => {
    const areKeysCached =
      Boolean(cachedLocalesKeys.scope) && cachedLocalesKeys.keys?.length > 0;

    const shouldRestoreCachedLocales = isDataFetched && areKeysCached;

    if (!shouldRestoreCachedLocales) {
      return;
    }

    const populatedLocales = populateLocales(
      cachedLocalesKeys.keys,
      allLocales,
    );

    if (cachedLocalesKeys.scope === "tour") {
      setTourLanguages(populatedLocales);
    }
    if (cachedLocalesKeys.scope === "project") {
      setProjectLanguages(populatedLocales);
    }
    setCachedLocalesKeys({ scope: null, keys: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataFetched, cachedLocalesKeys]);

  const available = useMemo(() => {
    if (
      isTourContext &&
      Array.isArray(availableTourLocales) &&
      availableTourLocales.length > 0
    ) {
      return availableTourLocales;
    }
    if (
      isProjectContext &&
      Array.isArray(availableProjectLocales) &&
      availableProjectLocales.length > 0
    ) {
      return availableProjectLocales;
    }
    return LocaleDefaultOptions;
  }, [
    isTourContext,
    isProjectContext,
    availableTourLocales,
    availableProjectLocales,
  ]);

  const updateLocales = useCallback(
    (locales, scope) => {
      const localesPopulated = populateLocales(locales, allLocales);
      if (scope === "tour") {
        setTourLanguages(localesPopulated);
      } else if (scope === "project") {
        setProjectLanguages(localesPopulated);
      }

      if (!isDataFetched) {
        setCachedLocalesKeys({ scope, keys: locales });
      }
    },
    [allLocales, isDataFetched, setProjectLanguages, setTourLanguages],
  );

  const updateTourLocales = useCallback(
    (tourLocales) => {
      updateLocales(tourLocales, "tour");
    },
    [updateLocales],
  );

  const updateProjectLocales = useCallback(
    (projectLocales) => {
      updateLocales(projectLocales, "project");
    },
    [updateLocales],
  );

  const value = useMemo(
    () => ({ available, updateTourLocales, updateProjectLocales }),
    [available, updateTourLocales, updateProjectLocales],
  );

  return (
    <AvailableLocalesContext.Provider value={value}>
      {children}
    </AvailableLocalesContext.Provider>
  );
};

const LocaleDefaultOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
];

const populateLocales = (localeCodes, allLocalesPopulated = []) => {
  return localeCodes?.map((code) => {
    const populatedLocale = allLocalesPopulated.find(
      (loc) => loc.value === code,
    );
    return populatedLocale || { value: code, label: code };
  });
};
