import { useSearchParams } from "react-router";
import { Stack } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SidebarFooterSection from "@/components/sidebar/_sections/SidebarFooterSection";

function PoiAssetFooterSection({ onCancel }) {
  const [searchParams] = useSearchParams();
  const isNew = !searchParams.get("poiId");

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
    </SidebarFooterSection>
  );
}

export default PoiAssetFooterSection;
