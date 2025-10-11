import { useMemo } from "react";
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

const sourcesTabs = [
  { value: "library", label: "Library" },
  { value: "eureka", label: "Eureka" },
  { value: "europeana", label: "Europeana" },
  { value: "upload", label: "Upload" },
];

function AssetsModalSourcesRow({ allowedSources }) {
  const allowedTabs = useMemo(() => {
    if (allowedSources === "all") return sourcesTabs;
    return sourcesTabs.filter((tab) => allowedSources.includes(tab.value));
  }, [allowedSources]);

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
