import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Divider, styled } from "@mui/material";

import PoiFooterSection from "../../_common/_sections/PoiFooterSection";
import PoiMainSection from "../../_common/_sections/PoiMainSection";
import PoiNavigationTabsSection from "../../_common/_sections/PoiNavigationTabsSection";

const NoShrink = styled("div")({ flexShrinkg: 0 });
const ScrollableArea = styled("div")({
  flex: 1,
  overflowY: "auto",
});

function PoiForm({ onSubmit, onClose }) {
  const { t } = useTranslation();

  const poiTabs = useMemo(
    () => [
      { icon: "poi", value: "location", label: t("poiSidebar.tabs.location") },
      { icon: "info", value: "details", label: t("poiSidebar.tabs.details") },
      {
        icon: "link",
        value: "external-links",
        label: t("poiSidebar.tabs.externalLinks"),
      },
      { icon: "media", value: "media", label: t("poiSidebar.tabs.media") },
    ],
    [t],
  );

  const steps = useMemo(() => poiTabs.map((tab) => tab.value), [poiTabs]);

  return (
    <>
      <NoShrink>
        <PoiNavigationTabsSection
          tabs={poiTabs}
          fieldsPerStep={fieldsPerStep}
        />
        <Divider />
      </NoShrink>
      <ScrollableArea className="scrollable-area">
        <form id="poi-form" onSubmit={onSubmit}>
          <PoiMainSection />
        </form>
      </ScrollableArea>
      <NoShrink>
        <PoiFooterSection
          steps={steps}
          fieldsPerStep={fieldsPerStep}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </NoShrink>
    </>
  );
}

export default PoiForm;

const fieldsPerStep = [
  ["coordinates"],
  ["title", "description", "thumbnail"],
  ["quizLinks", "externalLinks"],
  [],
];
