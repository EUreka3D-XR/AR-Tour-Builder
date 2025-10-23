import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { styled, Tab, Tabs } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useParamsTabs from "@/hooks/useParamsTabs";

const NavigationAreaStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& .tabs-row": {
    padding: theme.spacing(1, 3, 0),
    "& .tab-item": {
      padding: theme.spacing(0, 4),
    },
  },
}));

function PoiNavigationTabsSection({ tabs: poiTabs = [], fieldsPerStep }) {
  const {
    formState: { errors },
  } = useFormContext();

  const { activeTab, setActiveTab, tabs } = useParamsTabs(
    "poiTab",
    poiTabs,
    "location",
  );

  const validityPerSteps = useMemo(() => {
    const validity = {};
    if (!fieldsPerStep) return validity;

    let previousStepsValid = true;

    poiTabs.forEach((tab, index) => {
      const stepFields = fieldsPerStep[index] || [];
      const isStepValid = !stepFields.some((field) => errors[field]);
      previousStepsValid = previousStepsValid && isStepValid;
      validity[tab.value] = previousStepsValid;
    });

    return validity;
  }, [errors, fieldsPerStep, poiTabs]);

  return (
    <NavigationAreaStyled>
      <Tabs value={activeTab} className="tabs-row" onChange={setActiveTab}>
        {tabs.map((tab, index) => {
          const id = `poi-nav-tab-${index}`;
          const aria = `poi-nav-tabpanel-${index}`;
          return (
            <Tab
              key={id}
              id={id}
              aria-controls={aria}
              value={tab.value}
              label={tab.label}
              disabled={validityPerSteps[tab.value] === false}
              icon={<EurekaIcon name={tab.icon} fontSize="small" />}
              iconPosition="start"
              className="tab-item"
            />
          );
        })}
      </Tabs>
    </NavigationAreaStyled>
  );
}

export default PoiNavigationTabsSection;
