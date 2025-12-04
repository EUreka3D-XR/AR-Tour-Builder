import { useSearchParams } from "react-router";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SidebarFooterSection from "@/components/sidebar/_sections/SidebarFooterSection";

function AssetFooterSection({ onCancel }) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const isNew = !searchParams.get("poiId");

  return (
    <SidebarFooterSection>
      <Button onClick={onCancel}>{t("librarySidebar.footer.cancel")}</Button>
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
            {t("librarySidebar.footer.createAsset")}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="filled"
            startIcon={<EurekaIcon name="save" />}
          >
            {t("librarySidebar.footer.saveChanges")}
          </Button>
        )}
      </Stack>
    </SidebarFooterSection>
  );
}

export default AssetFooterSection;
