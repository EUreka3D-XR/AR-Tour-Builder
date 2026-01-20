import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import {
  Box,
  Checkbox,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useAssetModal } from "@/stores/asset-modal-stores";
// import EuropeanaLinkImportModal from "@/components/europeana-link-import-modal/EuropeanaLinkImportModal";
import FormInput from "@/components/form/FormInput";
import FormInputCommonMultilingual from "@/components/form/FormInputCommonMultilingual";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import Link from "@/components/link/Link";
import { useLocale } from "@/hooks/useLocale";
import { useToggle } from "@/hooks/useToggle";
import {
  checkAssetUrlValidity,
  fileTypes,
  getExtensionsHelperForType,
} from "@/utils/fileExtensions";
import { localeValue } from "@/utils/inputLocale";
import { FormControlLabelStyled } from "../../_common/CommonFormComponents";
import AssetFormPreview from "../preview/AssetFormPreview";

function AssetFormMediaSection() {
  const { t } = useTranslation();
  const locale = useLocale();

  const { openAssetModalWithUrl } = useAssetModal();

  const { isOpen: isMultilingual, toggle: toggleMultilingual } = useToggle();
  // const {
  //   isOpen: isEurekaImportModalOpen,
  //   open: openEurekaImportModal,
  //   close: closeEurekaImportModal,
  // } = useToggle();

  const assetType = useWatch({ name: "type" });
  const contentUrl = useWatch({ name: "contentUrl" });

  const helperTextForUrl = useMemo(() => {
    return getExtensionsHelperForType(assetType);
  }, [assetType]);

  const isValidUrl = useMemo(() => {
    const url = localeValue(contentUrl, locale);
    return checkAssetUrlValidity(url);
  }, [contentUrl, locale]);

  return (
    <>
      <Divider />
      <Typography variant="h5">{t("asset.form.section.media")}</Typography>
      <FormInput
        name="type"
        render={({ field }) => (
          <LabeledInput label={t("asset.form.field.media_type")}>
            <Select {...field} fullWidth displayEmpty>
              <MenuItem value="" disabled>
                <em>{t("asset.form.placeholder.select_media_type")}</em>
              </MenuItem>
              {fileTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </LabeledInput>
        )}
      />
      <FormControlLabelStyled
        control={
          <Checkbox checked={isMultilingual} onChange={toggleMultilingual} />
        }
        label={
          <div className="checkbox-label">
            <Typography variant="body2">
              {t("asset.form.field.multilingual_media")}
            </Typography>
            <Typography variant="caption">
              {t("asset.form.help.multilingual_media_description")}
            </Typography>
          </div>
        }
      />
      <div>
        {/* <Box mb={2}>
          <span>
            <Link
              to="#"
              underline="always"
              onClick={openEurekaImportModal}
              sx={{ fontWeight: 500 }}
            >
              {t("asset.form.import_from_europeana.click_here")}
            </Link>{" "}
            {t("asset.form.import_from_europeana.text")}
          </span>
        </Box> */}
        {isMultilingual ? (
          <FormInputMultilingual
            name="contentUrl"
            render={({ field }) => (
              <LabeledInput
                label={t("asset.form.field.media_url")}
                isMultilingual
              >
                <TextField
                  {...field}
                  placeholder={t("asset.form.placeholder.media_url_example")}
                  fullWidth
                  helperText={helperTextForUrl}
                  type="url"
                />
              </LabeledInput>
            )}
          />
        ) : (
          <FormInputCommonMultilingual
            name="contentUrl"
            render={({ field }) => (
              <LabeledInput label={t("asset.form.field.media_url")}>
                <TextField
                  {...field}
                  placeholder={t("asset.form.placeholder.media_url_example")}
                  fullWidth
                  helperText={helperTextForUrl}
                  type="url"
                />
              </LabeledInput>
            )}
          />
        )}
        {isValidUrl && (
          <Box sx={{ mt: 1, ml: 1 }}>
            <Link
              to="#"
              underline="always"
              onClick={() =>
                openAssetModalWithUrl({
                  url: localeValue(contentUrl, locale),
                })
              }
            >
              {t("asset.form.action.preview_fullscreen")}
            </Link>
          </Box>
        )}
      </div>
      {isValidUrl && (
        <AssetFormPreview
          url={localeValue(contentUrl, locale)}
          type={assetType}
        />
      )}
      {/* <EuropeanaLinkImportModal
        isOpen={isEurekaImportModalOpen}
        onClose={closeEurekaImportModal}
        onExtract={() => {}}
      /> */}
    </>
  );
}

export default AssetFormMediaSection;
