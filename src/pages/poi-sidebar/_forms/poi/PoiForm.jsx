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

const poiTabs = [
  { icon: "poi", value: "location", label: "Location" },
  { icon: "info", value: "details", label: "Details" },
  { icon: "link", value: "external-links", label: "External Links" },
  { icon: "media", value: "media", label: "Media" },
];
const steps = poiTabs.map((tab) => tab.value);
const fieldsPerStep = [
  ["coordinates"],
  ["title", "description", "thumbnail"],
  ["quizLinks", "externalLinks"],
  [],
];
