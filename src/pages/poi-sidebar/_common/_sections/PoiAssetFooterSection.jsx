import { useSearchParams } from "react-router";
import { Stack, styled } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";

const FooterStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
}));

function PoiAssetFooterSection({ onCancel }) {
  const [searchParams] = useSearchParams();
  const isNew = !searchParams.get("poiId");

  return (
    <FooterStyled className="poi-sidebar-footer">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button onClick={onCancel}>Cancel</Button>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          {isNew ? (
            <Button
              type="submit"
              variant="filled"
              startIcon={<EurekaIcon name="save" />}
            >
              Create Media Asset
            </Button>
          ) : (
            <Button
              type="submit"
              variant="filled"
              startIcon={<EurekaIcon name="save" />}
            >
              Save Changes
            </Button>
          )}
        </Stack>
      </Stack>
    </FooterStyled>
  );
}

export default PoiAssetFooterSection;
