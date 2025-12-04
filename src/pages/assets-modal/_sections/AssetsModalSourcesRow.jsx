import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { styled, Tab, Tabs } from "@mui/material";

import { useTabs } from "@/hooks/useTabs";

const SourcesRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& .tabs-row": {
    padding: theme.spacing(1, 3, 0),
    "& .tab-item": {
      padding: theme.spacing(0, 2),
    },
  },
}));

function AssetsModalSourcesRow({ allowedSources }) {
  const { t } = useTranslation();

  const sourcesTabs = useMemo(() => [
    { value: "library", label: t("assetsModal.sources.libraryTab") },
    { value: "external", label: t("assetsModal.sources.externalTab") },
    { value: "upload", label: t("assetsModal.sources.uploadTab") },
  ], [t]);

  const allowedTabs = useMemo(() => {
    if (allowedSources === "all") return sourcesTabs;
    return sourcesTabs.filter((tab) => allowedSources.includes(tab.value));
  }, [allowedSources, sourcesTabs]);

  const { activeTab, setActiveTab, tabs } = useTabs(allowedTabs);

  return (
    <SourcesRow>
      <Tabs value={activeTab} className="tabs-row" onChange={setActiveTab}>
        {tabs.map((tab, index) => {
          const id = `sources-tab-${index}`;
          const aria = `sources-tabpanel-${index}`;
          return (
            <Tab
              key={id}
              id={id}
              aria-controls={aria}
              value={tab.value}
              label={tab.label}
              // icon={<EurekaIcon name={tab.icon} fontSize="small" />}
              // iconPosition="start"
              className="tab-item"
            />
          );
        })}
      </Tabs>
    </SourcesRow>
  );
}

export default AssetsModalSourcesRow;
