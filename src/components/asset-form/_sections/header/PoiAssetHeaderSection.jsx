import { IconButton, styled } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

const AssetHeaderStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1, 3),
  "& .header-title": {
    ...theme.typography.h5,
  },
}));

function PoiAssetHeaderSection({ title, onBack }) {
  return (
    <AssetHeaderStyled>
      <IconButton onClick={onBack}>
        <EurekaIcon name="back" />
      </IconButton>
      <span className="header-title">{title}</span>
    </AssetHeaderStyled>
  );
}

export default PoiAssetHeaderSection;
