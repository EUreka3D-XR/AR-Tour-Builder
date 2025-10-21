import { styled, Tab, Tabs } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";
import useUrlTabs from "@/hooks/useUrlTabs";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5, 2, 0, 0),
  "& .tabs-section": {},
  "& .language-input": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    position: "unset",
    "& .language-select": {
      marginTop: 0,
      "&::before": {
        borderBottomWidth: 0,
      },
      "& >[role='combobox']": {
        paddingBottom: 0,
      },
    },
    "& label": {
      position: "unset",
      transform: "none",
      fontSize: "0.875rem",
    },
  },
}));

function TourNavigationTabsSection() {
  const { routes } = useNavPaths();

  const { tabs, activeTab, setActiveTab } = useUrlTabs([
    {
      icon: "info",
      label: "Tour Information",
      value: routes.tourInfo,
    },
    {
      icon: "poi",
      label: "Points of Interest",
      value: routes.pois.index,
    },
  ]);

  return (
    <ContainerStyled className="tour-navigation-tabs-section">
      <Tabs value={activeTab} onChange={setActiveTab}>
        {tabs.map((tab, index) => {
          const id = `tour-nav-tab-${index}`;
          const aria = `tour-nav-tabpanel-${index}`;
          return (
            <Tab
              key={id}
              id={id}
              aria-controls={aria}
              value={tab.value}
              label={tab.label}
              icon={<EurekaIcon name={tab.icon} />}
              iconPosition="start"
            />
          );
        })}
      </Tabs>
    </ContainerStyled>
  );
}

export default TourNavigationTabsSection;
