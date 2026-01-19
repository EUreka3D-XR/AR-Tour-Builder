import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { Divider, styled } from "@mui/material";

import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import AssetBasicInfo from "./_sections/basic-info/AssetBasicInfo";
import AssetFormFooter from "./_sections/footer/AssetFormFooter";
import PoiAssetHeaderSection from "./_sections/header/PoiAssetHeaderSection";
import AssetFormMediaSection from "./_sections/media/AssetMediaSection";
import AssetFormModelAttributes from "./_sections/model-attributes/AssetFormModelAttributes";

const ContainerStyled = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& .poi-asset-form-inner": {
    flex: 1,
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    overflow: "auto",
  },
  "& .language-selector": {
    alignSelf: "flex-end",
  },
  "& .models-details": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const NoShrink = styled("div")({ flexShrink: 0 });

function AssetForm({ isPoiAsset, onSubmit, onClose }) {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const isNewPoiAsset = !searchParams.get("mediaId");

  const { setValue } = useFormContext();

  const isGeoreferenced = useWatch({ name: "isGeoreferenced" });

  useEffect(() => {
    // when isGeoreferenced value changes, if true, set the arPlacement to true
    if (isGeoreferenced) {
      setValue("isGroundPlaced", true);
    }
  }, [isGeoreferenced, setValue]);

  return (
    <form id="poi-asset-form" onSubmit={onSubmit}>
      <ContainerStyled className="poi-asset-form-wrapper">
        {isPoiAsset && (
          <NoShrink>
            <PoiAssetHeaderSection
              title={
                isNewPoiAsset
                  ? t("asset.form.section.create_asset")
                  : t("asset.form.section.editing_asset")
              }
              onBack={onClose}
            />
            <Divider />
          </NoShrink>
        )}
        <div className="poi-asset-form-inner">
          <LanguageDropdown className="language-selector" />
          <AssetBasicInfo isPoiAsset={isPoiAsset} />
          <AssetFormMediaSection />
          <AssetFormModelAttributes isPoiAsset={isPoiAsset} />
        </div>
        <NoShrink>
          <AssetFormFooter
            isPoiAsset={isPoiAsset}
            onCancel={onClose}
            onSubmit={onSubmit}
          />
        </NoShrink>
      </ContainerStyled>
    </form>
  );
}

export default AssetForm;
