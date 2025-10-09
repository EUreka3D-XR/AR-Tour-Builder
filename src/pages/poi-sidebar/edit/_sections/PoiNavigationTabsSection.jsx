import { styled, Tab, Tabs } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useParamsTabs from "@/hooks/useParamsTabs";

const poiTabs = [
  { icon: "poi", value: "location", label: "Location" },
  { icon: "info", value: "details", label: "Details" },
  { icon: "media", value: "media", label: "Media" },
];

const NavigationAreaStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .tabs-row": {
    padding: theme.spacing(1, 3, 0),
    "& .tab-item": {
      padding: theme.spacing(0, 4),
    },
  },
}));

function PoiNavigationTabsSection() {
  const { activeTab, setActiveTab, tabs } = useParamsTabs(
    "poiTab",
    poiTabs,
    "location",
  );

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
