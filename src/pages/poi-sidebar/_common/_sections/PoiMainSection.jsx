import { styled } from "@mui/material";

import useParamsTabs from "@/hooks/useParamsTabs";
import PoiMediaTab from "../_tabs/_media/PoiMediaTab";
import PoiDetailsTab from "../_tabs/PoiDetailsTab";
import PoiExternalLinksTab from "../_tabs/PoiExternalLinksTab";
import PoiLocationTab from "../_tabs/PoiLocationTab";

const MainAreaStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
}));

function PoiMainSection() {
  const { activeTab } = useParamsTabs("poiTab");

  return (
    <MainAreaStyled>
      {activeTab === "location" && <PoiLocationTab />}
      {activeTab === "details" && <PoiDetailsTab />}
      {activeTab === "external-links" && <PoiExternalLinksTab />}
      {activeTab === "media" && <PoiMediaTab />}
    </MainAreaStyled>
  );
}

export default PoiMainSection;
