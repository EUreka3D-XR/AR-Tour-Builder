import { useMemo } from "react";
import { Divider, styled } from "@mui/material";

import PoiFooterSection from "../../_common/_sections/PoiFooterSection";
import PoiMainSection from "../../_common/_sections/PoiMainSection";
import PoiNavigationTabsSection from "../../_common/_sections/PoiNavigationTabsSection";

const NoShrink = styled("div")({ flexShrinkg: 0 });
const ScrollableArea = styled("div")({
  flex: 1,
  overflowY: "auto",
});

function PoiForm({ poiTabs = [], onSubmit, onClose }) {
  const steps = useMemo(() => poiTabs.map((tab) => tab.value), [poiTabs]);

  return (
    <>
      <NoShrink>
        <PoiNavigationTabsSection tabs={poiTabs} />
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
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </NoShrink>
    </>
  );
}

export default PoiForm;
