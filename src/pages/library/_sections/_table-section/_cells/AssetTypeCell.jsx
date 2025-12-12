import { useTranslation } from "react-i18next";
import { lighten, styled } from "@mui/material";

import MediaIcon from "@/components/icon/MediaIcon";

const CellStyled = styled("div")(({ theme }) => ({
  width: "max-content",
  fontWeight: 500,
  padding: theme.spacing(0.5, 1),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  "&.icon-image": {
    backgroundColor: lighten(theme.palette.primary.light, 0.9),
    color: theme.palette.primary.dark,
  },
  "&.icon-video": {
    backgroundColor: lighten(theme.palette.secondary.light, 0.9),
    color: theme.palette.secondary.dark,
  },
  "&.icon-audio": {
    backgroundColor: lighten(theme.palette.error.light, 0.9),
    color: theme.palette.error.dark,
  },
  "&.icon-text": {
    backgroundColor: lighten(theme.palette.success.light, 0.9),
    color: theme.palette.success.dark,
  },
  "&.icon-model3d": {
    backgroundColor: lighten(theme.palette.warning.light, 0.9),
    color: theme.palette.warning.dark,
  },
  "&.no-color": {
    color: "inherit",
  },
}));

function AssetTypeCell({ type }) {
  const { t } = useTranslation();
  return (
    <CellStyled className={`asset-type-cell icon-${type}`}>
      <MediaIcon type={type} />
      {t(`fileTypes.${type}`)}
    </CellStyled>
  );
}

export default AssetTypeCell;
