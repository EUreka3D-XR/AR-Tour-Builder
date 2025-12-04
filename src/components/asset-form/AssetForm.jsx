import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import { useAssetModal } from "@/stores/asset-modal-stores";
import FormInput from "@/components/form/FormInput";
import FormInputCommonMultilingual from "@/components/form/FormInputCommonMultilingual";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import { useLocale } from "@/hooks/useLocale";
import {
  checkAssetUrlValidity,
  fileTypes,
  getExtensionsHelperForType,
} from "@/utils/fileExtensions";
import { localeValue } from "@/utils/inputLocale";
import Link from "../link/Link";
import AssetFormFooter from "./AssetFormFooter";
import AssetFormPreview from "./AssetFormPreview";
import PoiAssetHeaderSection from "./PoiAssetHeaderSection";

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

const FormControlLabelStyled = styled(FormControlLabel)(({ theme }) => ({
  alignItems: "flex-start",
  "& .checkbox-label": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25),
  },
}));

const CoordinatesRow = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(3),
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
}));

function AssetForm({ isPoiAsset, onSubmit, onClose }) {
  const { t } = useTranslation();
  const [isMultilingual, setIsMultilingual] = useState(false);
  const locale = useLocale();

  const { openAssetModalWithUrl } = useAssetModal();

  const [searchParams] = useSearchParams();

  const isNewPoiAsset = !searchParams.get("mediaId");

  const assetType = useWatch({ name: "type" });
  const contentUrl = useWatch({ name: "contentUrl" });
  const isGeoreferenced = useWatch({ name: "isGeoreferenced" });
  const helperTextForUrl = useMemo(() => {
    return getExtensionsHelperForType(assetType);
  }, [assetType]);

  const isValidUrl = useMemo(() => {
    const url = localeValue(contentUrl, locale);
    return checkAssetUrlValidity(url);
  }, [contentUrl, locale]);

  return (
    <form id="poi-asset-form" onSubmit={onSubmit}>
      <ContainerStyled className="poi-asset-form-wrapper">
        {isPoiAsset && (
          <NoShrink>
            <PoiAssetHeaderSection
              title={isNewPoiAsset ? t("asset.form.section.create_asset") : t("asset.form.section.editing_asset")}
              onBack={onClose}
            />
            <Divider />
          </NoShrink>
        )}
        <div className="poi-asset-form-inner">
          <LanguageDropdown className="language-selector" />
          <FormInputMultilingual
            name="title"
            render={({ field }) => (
              <LabeledInput label={t("asset.form.field.title")} isMultilingual>
                <TextField
                  {...field}
                  placeholder={t("asset.form.placeholder.enter_media_title")}
                  fullWidth
                />
              </LabeledInput>
            )}
          />
          <FormInputMultilingual
            name="description"
            render={({ field }) => (
              <LabeledInput label={t("asset.form.field.description")} isMultilingual>
                <TextField
                  {...field}
                  placeholder={t("asset.form.placeholder.enter_media_description")}
                  fullWidth
                  multiline
                  rows={4}
                />
              </LabeledInput>
            )}
          />
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
              <Checkbox
                checked={isMultilingual}
                onChange={(e) => setIsMultilingual(e.target.checked)}
              />
            }
            label={
              <div className="checkbox-label">
                <Typography variant="body2">{t("asset.form.field.multilingual_media")}</Typography>
                <Typography variant="caption">
                  {t("asset.form.help.multilingual_media_description")}
                </Typography>
              </div>
            }
          />
          <div>
            {isMultilingual ? (
              <FormInputMultilingual
                name="contentUrl"
                render={({ field }) => (
                  <LabeledInput label={t("asset.form.field.media_url")} isMultilingual>
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
          {assetType === "model3d" && (
            <>
              <Divider />
              <Typography variant="h5">{t("asset.form.section.model_attributes")}</Typography>
              <div className="models-details">
                {isPoiAsset && (
                  <FormInput
                    name="modelAssetAttributes.viewInAR"
                    render={({ field }) => (
                      <FormControlLabelStyled
                        control={
                          <Checkbox
                            checked={Boolean(field.value)}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        }
                        label={
                          <div className="checkbox-label">
                            <Typography variant="body2">{t("asset.form.field.view_in_ar")}</Typography>
                            <Typography variant="caption">
                              {t("asset.form.help.view_in_ar_description")}
                            </Typography>
                          </div>
                        }
                      />
                    )}
                  />
                )}
                <FormInput
                  name="isGeoreferenced"
                  render={({ field }) => (
                    <FormControlLabelStyled
                      control={
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label={
                        <div className="checkbox-label">
                          <Typography variant="body2">{t("asset.form.field.georeferenced")}</Typography>
                          <Typography variant="caption">
                            {t("asset.form.help.georeferenced_description")}
                          </Typography>
                        </div>
                      }
                    />
                  )}
                />
                {isGeoreferenced && (
                  <CoordinatesRow className="coordinates-row">
                    <FormInput
                      name="georeference.lat"
                      render={({ field }) => (
                        <LabeledInput label={t("asset.form.field.latitude")}>
                          <TextField
                            {...field}
                            className="coordinate-field"
                            placeholder={t("asset.form.placeholder.latitude_example")}
                          />
                        </LabeledInput>
                      )}
                    />
                    <FormInput
                      name="georeference.long"
                      render={({ field }) => (
                        <LabeledInput label={t("asset.form.field.longitude")}>
                          <TextField
                            {...field}
                            className="coordinate-field"
                            placeholder={t("asset.form.placeholder.longitude_example")}
                          />
                        </LabeledInput>
                      )}
                    />
                  </CoordinatesRow>
                )}
              </div>
              {isPoiAsset && (
                <>
                  <Divider />
                  <div>
                    <Typography variant="h5">{t("asset.form.section.linked_audio")}</Typography>
                    <Typography variant="caption">
                      {t("asset.form.help.linked_audio_description")}
                    </Typography>
                  </div>

                  <FormInputMultilingual
                    name="modelAssetAttributes.linkedAsset.title"
                    render={({ field }) => (
                      <LabeledInput label={t("asset.form.field.audio_title")} isMultilingual>
                        <TextField
                          {...field}
                          placeholder={t("asset.form.placeholder.enter_audio_title")}
                          fullWidth
                        />
                      </LabeledInput>
                    )}
                  />
                  <FormInputMultilingual
                    name="modelAssetAttributes.linkedAsset.contentUrl"
                    render={({ field }) => (
                      <LabeledInput label={t("asset.form.field.audio_url")} isMultilingual>
                        <TextField
                          {...field}
                          placeholder={t("asset.form.placeholder.audio_url_example")}
                          fullWidth
                          type="url"
                        />
                      </LabeledInput>
                    )}
                  />
                </>
              )}
            </>
          )}
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
