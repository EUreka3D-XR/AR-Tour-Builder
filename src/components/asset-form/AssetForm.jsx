import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
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
import CoordinatesInput from "../coordinates-input/CoordinatesInput";
import Link from "../link/Link";
import NumberInput from "../number-input/NumberInput";
import SwitchToggle from "../switch/SwitchToggle";
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
  gap: theme.spacing(1),
  "& .checkbox-label": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25),
  },
}));

const SubGroup = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  "& .grid": {
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    gap: theme.spacing(2) /* Row + column gap */,
    alignItems: "start",
    "& .col-1": {
      maxWidth: "200px",
    },
  },
  "& .checkbox-label": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25),
  },
}));

function AssetForm({ isPoiAsset, onSubmit, onClose }) {
  const { t } = useTranslation();
  const [isMultilingual, setIsMultilingual] = useState(false);
  const locale = useLocale();

  const { openAssetModalWithUrl } = useAssetModal();

  const [searchParams] = useSearchParams();

  const isNewPoiAsset = !searchParams.get("mediaId");

  const { setValue } = useFormContext();

  const assetType = useWatch({ name: "type" });
  const contentUrl = useWatch({ name: "contentUrl" });
  const isGeoreferenced = useWatch({ name: "isGeoreferenced" });
  const isARShown = useWatch({ name: "viewInAr" });

  const helperTextForUrl = useMemo(() => {
    return getExtensionsHelperForType(assetType);
  }, [assetType]);

  const isValidUrl = useMemo(() => {
    const url = localeValue(contentUrl, locale);
    return checkAssetUrlValidity(url);
  }, [contentUrl, locale]);

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
              <LabeledInput
                label={t("asset.form.field.description")}
                isMultilingual
              >
                <TextField
                  {...field}
                  placeholder={t(
                    "asset.form.placeholder.enter_media_description",
                  )}
                  fullWidth
                  multiline
                  rows={4}
                />
              </LabeledInput>
            )}
          />
          <FormInput
            name="priority"
            render={({ field }) => (
              <FormControlLabelStyled
                control={
                  <Checkbox
                    checked={field.value === "high"}
                    onChange={(e) =>
                      field.onChange(e.target.checked ? "high" : "normal")
                    }
                  />
                }
                label={
                  <div className="checkbox-label">
                    <Typography variant="body2">
                      {t("asset.form.field.primary")}
                    </Typography>
                    <Typography variant="caption">
                      {t("asset.form.help.primary_description")}
                    </Typography>
                  </div>
                }
              />
            )}
          />
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
              <Checkbox
                checked={isMultilingual}
                onChange={(e) => setIsMultilingual(e.target.checked)}
              />
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
                      placeholder={t(
                        "asset.form.placeholder.media_url_example",
                      )}
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
                      placeholder={t(
                        "asset.form.placeholder.media_url_example",
                      )}
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
              <Typography variant="h5">
                {t("asset.form.section.model_attributes")}
              </Typography>
              <div className="models-details">
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
                          <Typography variant="body2">
                            {t("asset.form.field.georeferenced")}
                          </Typography>
                          <Typography variant="caption">
                            {t("asset.form.help.georeferenced_description")}
                          </Typography>
                        </div>
                      }
                    />
                  )}
                />
                {isGeoreferenced && (
                  <SubGroup>
                    <CoordinatesInput
                      name="georeference"
                      showMap
                      mapHeight={300}
                    />
                  </SubGroup>
                )}
                {isPoiAsset && (
                  <>
                    <FormInput
                      name="viewInAr"
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
                              <Typography variant="body2">
                                {t("asset.form.field.view_in_ar")}
                              </Typography>
                              <Typography variant="caption">
                                {t("asset.form.help.view_in_ar_description")}
                              </Typography>
                            </div>
                          }
                        />
                      )}
                    />
                    {isARShown && (
                      <>
                        <SubGroup>
                          <div className="grid">
                            <div className="col-1">
                              <FormInput
                                name="spawnRadius"
                                render={({ field }) => (
                                  <NumberInput
                                    {...field}
                                    iconName="radius"
                                    endAdornmentText="m"
                                    sx={{ maxWidth: "140px" }}
                                  />
                                )}
                              />
                            </div>
                            <div className="col-2">
                              <div className="checkbox-label">
                                <Typography variant="body2">
                                  {t("asset.form.field.spawn_radius")}
                                </Typography>
                                <Typography variant="caption">
                                  {t(
                                    "asset.form.help.spawn_radius_description",
                                  )}
                                </Typography>
                              </div>
                            </div>
                            <div className="col-1">
                              <FormInput
                                name="isGroundPlaced"
                                render={({ field }) => (
                                  <SwitchToggle
                                    value={Boolean(field.value)}
                                    options={[
                                      {
                                        label: t(
                                          "asset.form.ground_placed_options.free",
                                        ),
                                        value: "air",
                                      },
                                      {
                                        label: t(
                                          "asset.form.ground_placed_options.ground",
                                        ),
                                        value: "ground",
                                        actAsChecked: true,
                                      },
                                    ]}
                                    onChange={(newValue) =>
                                      field.onChange(newValue)
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div className="col-2">
                              <div className="checkbox-label">
                                <Typography variant="body2">
                                  {t("asset.form.field.ground_placed")}
                                </Typography>
                                <Typography variant="caption">
                                  {t(
                                    "asset.form.help.ground_placed_description",
                                  )}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </SubGroup>
                      </>
                    )}
                  </>
                )}
              </div>
              {isPoiAsset && (
                <>
                  <Divider />
                  <div>
                    <Typography variant="h5">
                      {t("asset.form.section.linked_audio")}
                    </Typography>
                    <Typography variant="caption">
                      {t("asset.form.help.linked_audio_description")}
                    </Typography>
                  </div>

                  <FormInputMultilingual
                    name="linkedAsset.title"
                    render={({ field }) => (
                      <LabeledInput
                        label={t("asset.form.field.audio_title")}
                        isMultilingual
                      >
                        <TextField
                          {...field}
                          placeholder={t(
                            "asset.form.placeholder.enter_audio_title",
                          )}
                          fullWidth
                        />
                      </LabeledInput>
                    )}
                  />
                  <FormInputMultilingual
                    name="linkedAsset.contentUrl"
                    render={({ field }) => (
                      <LabeledInput
                        label={t("asset.form.field.audio_url")}
                        isMultilingual
                      >
                        <TextField
                          {...field}
                          placeholder={t(
                            "asset.form.placeholder.audio_url_example",
                          )}
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
