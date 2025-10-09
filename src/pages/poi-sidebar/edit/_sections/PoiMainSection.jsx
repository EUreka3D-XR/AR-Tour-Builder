import { styled } from "@mui/material";

import useParamsTabs from "@/hooks/useParamsTabs";
import PoiLocationTab from "../_tabs/PoiLocationTab";

const MainAreaStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

function PoiMainSection() {
  const { activeTab } = useParamsTabs("poiTab");

  console.log(activeTab);

  return (
    <MainAreaStyled>
      {activeTab === "location" && <PoiLocationTab />}
      {activeTab === "details" && "PoiDetailsSection"}
      {activeTab === "media" && "PoiMediaSection"}
    </MainAreaStyled>
  );
}

export default PoiMainSection;
