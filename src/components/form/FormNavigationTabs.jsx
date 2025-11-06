import { styled, Tab, Tabs } from "@mui/material";

import useParamsTabs from "@/hooks/useParamsTabs";
import EurekaIcon from "../icon/EurekaIcon";

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

function FormNavigationTabs({
  paramKey,
  initialTab,
  tabs: propTabs = [],
  validSteps = [],
  isNew,
}) {
  const { activeTab, setActiveTab, tabs } = useParamsTabs(
    paramKey,
    propTabs,
    initialTab,
  );

  return (
    <NavigationAreaStyled>
      <Tabs value={activeTab} className="tabs-row" onChange={setActiveTab}>
        {tabs.map((tab, index) => {
          const id = `${paramKey}-nav-tab-${index}`;
          const aria = `${paramKey}-nav-tabpanel-${index}`;
          const isDisabled = isNew && index > 0 && !validSteps[index - 1];
          return (
            <Tab
              key={id}
              id={id}
              aria-controls={aria}
              value={tab.value}
              label={tab.label}
              disabled={isDisabled}
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

export default FormNavigationTabs;
