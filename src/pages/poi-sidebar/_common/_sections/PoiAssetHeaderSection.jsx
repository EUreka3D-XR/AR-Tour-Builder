import { IconButton, styled } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

const AssetHeaderStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1, 3, 0),
  "& .header-title": {
    ...theme.typography.h4,
    marginLeft: theme.spacing(5),
  },
}));

function PoiAssetHeaderSection({ onBack }) {
  return (
    <AssetHeaderStyled>
      <IconButton onClick={onBack}>
        <EurekaIcon name="back" />
      </IconButton>
      <span className="header-title">Assets</span>
    </AssetHeaderStyled>
  );
}

export default PoiAssetHeaderSection;
