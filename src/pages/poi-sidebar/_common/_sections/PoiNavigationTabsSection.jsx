import { useParams } from "react-router";
import { styled, Tab, Tabs } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useParamsTabs from "@/hooks/useParamsTabs";
import { usePoiEnabledTabs } from "../_utils/usePoiTabsValidation";

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

function PoiNavigationTabsSection({ tabs: poiTabs = [] }) {
  const { poiId } = useParams();
  const isNew = !poiId;

  const { activeTab, setActiveTab, tabs } = useParamsTabs(
    "poiTab",
    poiTabs,
    "location",
  );

  const enabledTabs = usePoiEnabledTabs(poiTabs);

  const changeTab = (e, val) => {
    if (isNew && !enabledTabs[val]) {
      return;
    }
    setActiveTab(e, val);
  };

  return (
    <NavigationAreaStyled>
      <Tabs value={activeTab} className="tabs-row" onChange={changeTab}>
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
              disabled={!enabledTabs[tab.value]}
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
