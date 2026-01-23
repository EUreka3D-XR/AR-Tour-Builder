import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useFormContext } from "react-hook-form";

import useParamsTabs from "@/hooks/useParamsTabs";
import { SchemaPerPoiTab } from "./poiSchemaPerTab";

const usePoiEnabledTabs = (poiTabs = []) => {
  const { poiId } = useParams();
  const { activeTab } = useParamsTabs("poiTab");
  const { watch } = useFormContext();

  const values = watch();
  const isNew = !poiId;
  const [isCurrentTabValid, setIsCurrentTabValid] = useState(false);

  useEffect(() => {
    const schema = SchemaPerPoiTab[activeTab];
    if (!schema) {
      setIsCurrentTabValid(true);
      return;
    }
    schema.isValid(values).then(setIsCurrentTabValid);
  }, [values, activeTab]);

  // Calculate which tabs should be enabled
  // Only current tab and next tab (if current is valid) are enabled
  const enabledTabs = useMemo(() => {
    const enabled = {};
    const currentIndex = poiTabs.findIndex((tab) => tab.value === activeTab);

    poiTabs.forEach((tab, index) => {
      const isPreviousOrCurrent = index <= currentIndex;
      const isNextStep = index === currentIndex + 1 && isCurrentTabValid;
      enabled[tab.value] = isNew ? isPreviousOrCurrent || isNextStep : true;
    });

    return enabled;
  }, [poiTabs, activeTab, isCurrentTabValid, isNew]);

  return enabledTabs;
};

export default usePoiEnabledTabs;
