import { useParams, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import SidebarFooterSection from "@/components/sidebar/_sections/SidebarFooterSection";

function AssetFormFooter({ onSubmit, isPoiAsset, onCancel }) {
  const { t } = useTranslation();
  const { assetId } = useParams();
  const [searchParams] = useSearchParams();
  const paramsAssetId = searchParams.get("mediaId");
  const isNew = !assetId && !paramsAssetId;

  const handleFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <SidebarFooterSection>
      <Button onClick={onCancel}>{t("common.action.cancel")}</Button>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        {isNew ? (
          <Button
            onClick={handleFormSubmit}
            variant="filled"
            startIcon={<EurekaIcon name="save" />}
          >
            {isPoiAsset
              ? t("asset.form.action.add_media_asset")
              : t("asset.form.action.create_media_asset")}
          </Button>
        ) : (
          <Button
            onClick={handleFormSubmit}
            variant="filled"
            startIcon={<EurekaIcon name="save" />}
          >
            {t("asset.form.action.save_changes")}
          </Button>
        )}
      </Stack>
    </SidebarFooterSection>
  );
}

export default AssetFormFooter;
