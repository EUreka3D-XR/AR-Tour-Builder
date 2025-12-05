import { useMemo } from "react";
import { styled, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";

import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";
import useUrlTabs from "@/hooks/useUrlTabs";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& .tabs-row": {
    padding: theme.spacing(1, 3, 0),
    "& .tab-item": {
      padding: theme.spacing(0, 4),
    },
  },
}));

function SettingsNavigationTabs() {
  const { t } = useTranslation();
  const { routes } = useNavPaths();

  const tabs = useMemo(
    () => [
      { value: routes.projectGeneral, label: t("projectSettings.tabs.general"), icon: "settings" },
      {
        value: routes.projectLocales,
        label: t("projectSettings.tabs.supportedLanguages"),
        icon: "language",
      },
      { value: routes.projectBranding, label: t("projectSettings.tabs.branding"), icon: "palette" },
      { value: routes.projectMembers, label: t("projectSettings.tabs.members"), icon: "users" },
    ],
    [routes, t],
  );
  const { activeTab, setActiveTab } = useUrlTabs(tabs, routes.projectGeneral);
  return (
    <ContainerStyled>
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
    </ContainerStyled>
  );
}

export default SettingsNavigationTabs;
