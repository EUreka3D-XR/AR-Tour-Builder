import { useMemo } from "react";
import { Outlet } from "react-router";
import { Divider, styled, Tab, Tabs } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";
import useUrlTabs from "@/hooks/useUrlTabs";
import SettingsHeader from "./_sections/SettingsHeader";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "library-page-container",
  height: "100%",
  padding: theme.spacing(4, 4, 0),
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

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

const InnerOutletStyled = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  padding: theme.spacing(4, 4),
}));

function ProjectSettingsContainer() {
  const { routes } = useNavPaths();
  const tabs = useMemo(
    () => [
      { value: routes.projectGeneral, label: "General", icon: "settings" },
      {
        value: routes.projectLocales,
        label: "Supported Languages",
        icon: "language",
      },
      { value: routes.projectBranding, label: "Branding", icon: "palette" },
      { value: routes.projectMembers, label: "Members", icon: "users" },
    ],
    [routes],
  );
  const { activeTab, setActiveTab } = useUrlTabs(tabs, routes.projectGeneral);
  return (
    <ContainerStyled>
      <SettingsHeader />
      <NavigationAreaStyled>
        <Tabs value={activeTab} className="tabs-row" onChange={setActiveTab}>
          {tabs.map((tab, index) => {
            const id = `settings-nav-tab-${index}`;
            const aria = `settings-nav-tabpanel-${index}`;
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
      <Divider />
      <InnerOutletStyled>
        <Outlet />
      </InnerOutletStyled>
    </ContainerStyled>
  );
}

export default ProjectSettingsContainer;
