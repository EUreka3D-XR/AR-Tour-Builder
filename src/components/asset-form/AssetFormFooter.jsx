import { useParams, useSearchParams } from "react-router";
import { Stack } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SidebarFooterSection from "@/components/sidebar/_sections/SidebarFooterSection";

function AssetFormFooter({ isPoiAsset, onCancel }) {
  const { assetId } = useParams();
  const [searchParams] = useSearchParams();
  const paramsAssetId = searchParams.get("mediaId");
  const isNew = !assetId && !paramsAssetId;

  return (
    <SidebarFooterSection>
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
            {isPoiAsset ? "Create Media Asset" : "Create  Asset"}
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
    </SidebarFooterSection>
  );
}

export default AssetFormFooter;
