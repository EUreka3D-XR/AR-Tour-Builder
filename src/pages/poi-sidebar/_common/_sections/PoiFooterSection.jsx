import { styled } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";

const FooterStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

function PoiFooterSection({
  onCancel,
  onSave,
  cancelText = "Cancel",
  saveText = "Save",
  saveIcon,
}) {
  return (
    <FooterStyled className="poi-sidebar-footer">
      <Button onClick={onCancel}>{cancelText}</Button>
      <Button
        variant="filled"
        startIcon={Boolean(saveIcon) && <EurekaIcon name={saveIcon} />}
        onClick={onSave}
      >
        {saveText}
      </Button>
    </FooterStyled>
  );
}

export default PoiFooterSection;
