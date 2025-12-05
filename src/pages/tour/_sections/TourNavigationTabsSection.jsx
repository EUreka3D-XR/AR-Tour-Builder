import { useMemo } from "react";
import { useParams } from "react-router";
import { styled, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { tourId } = useParams();
  const tourStatus = tourId ? "existing" : "new";

  const { routes } = useNavPaths();

  const tabsConfig = useMemo(
    () => [
      {
        icon: "info",
        label: t("tour.tabs.information"),
        value: routes.tourInfo,
      },
      {
        icon: "poi",
        label: t("tour.tabs.pois"),
        value: routes.pois.index,
        disableForStatus: "new",
      },
    ],
    [t, routes],
  );

  const { tabs, activeTab, setActiveTab } = useUrlTabs(tabsConfig);

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
              disabled={tab.disableForStatus === tourStatus}
            />
          );
        })}
      </Tabs>
    </ContainerStyled>
  );
}

export default TourNavigationTabsSection;
