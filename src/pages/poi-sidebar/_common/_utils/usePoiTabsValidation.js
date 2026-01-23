import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useWatch } from "react-hook-form";

import useParamsTabs from "@/hooks/useParamsTabs";
import { SchemaPerPoiTab } from "./poiSchemaPerTab";

export const usePoiEnabledTabs = (poiTabs = []) => {
  const { poiId } = useParams();
  const { activeTab } = useParamsTabs("poiTab");

  const isNew = !poiId;

  const isCurrentStepValid = useValidateCurrentPoiStep();

  // Calculate which tabs should be enabled
  // Only current tab and next tab (if current is valid) are enabled
  const enabledTabs = useMemo(() => {
    const enabled = {};
    const currentIndex = poiTabs.findIndex((tab) => tab.value === activeTab);

    poiTabs.forEach((tab, index) => {
      const isPreviousOrCurrent = index <= currentIndex;
      const isNextStep = index === currentIndex + 1 && isCurrentStepValid;
      enabled[tab.value] = isNew ? isPreviousOrCurrent || isNextStep : true;
    });

    return enabled;
  }, [poiTabs, activeTab, isCurrentStepValid, isNew]);

  return enabledTabs;
};

export const useValidateCurrentPoiStep = () => {
  const values = useWatch();
  const { activeTab } = useParamsTabs("poiTab");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const schema = SchemaPerPoiTab[activeTab];
    if (!schema) {
      setIsValid(true);
      return;
    }
    schema.isValid(values).then(setIsValid);
  }, [values, activeTab]);

  return isValid;
};
