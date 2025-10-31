import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useWatch } from "react-hook-form";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import FormInput from "@/components/form/FormInput";
import FormInputCommonMultilingual from "@/components/form/FormInputCommonMultilingual";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import { fileTypes, getExtensionsHelperForType } from "@/utils/fileExtensions";
import PoiAssetFooterSection from "../../_common/_sections/PoiAssetFooterSection";
import PoiAssetHeaderSection from "../../_common/_sections/PoiAssetHeaderSection";

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

function PoiAssetForm({ onSubmit, onClose }) {
  const [isMultilingual, setIsMultilingual] = useState(false);

  const [searchParams] = useSearchParams();
  const isNewAsset = !searchParams.get("mediaId");

  const assetType = useWatch({ name: "type" });
  const helperTextForUrl = useMemo(() => {
    return getExtensionsHelperForType(assetType);
  }, [assetType]);

  return (
    <form id="poi-asset-form" onSubmit={onSubmit}>
      <ContainerStyled className="poi-asset-form-wrapper">
        <NoShrink>
          <PoiAssetHeaderSection
            title={isNewAsset ? "Create Asset" : "Editing Asset"}
            onBack={onClose}
          />
          <Divider />
        </NoShrink>
        <div className="poi-asset-form-inner">
          <LanguageDropdown className="language-selector" />
          <FormInputMultilingual
            name="title"
            render={({ field }) => (
              <LabeledInput label="Title" isMultilingual>
                <TextField
                  {...field}
                  placeholder="Enter media title"
                  fullWidth
                />
              </LabeledInput>
            )}
          />
          <FormInputMultilingual
            name="description"
            render={({ field }) => (
              <LabeledInput label="Description" isMultilingual>
                <TextField
                  {...field}
                  placeholder="Enter media description"
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
              <LabeledInput label="Media Type">
                <Select {...field} fullWidth displayEmpty>
                  <MenuItem value="" disabled>
                    <em>Select media type</em>
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
                <Typography variant="body2">Multilingual Media</Typography>
                <Typography variant="caption">
                  Enable this option to provide media content in multiple
                  languages. This is helpful for media containing text or audio
                  that needs to be accessible to a diverse audience.
                </Typography>
              </div>
            }
          />
          {isMultilingual ? (
            <FormInputMultilingual
              name="contentUrl"
              render={({ field }) => (
                <LabeledInput label="Media URL" isMultilingual>
                  <TextField
                    {...field}
                    placeholder="https://example.com/media-url.png"
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
                <LabeledInput label="Media URL">
                  <TextField
                    {...field}
                    placeholder="https://example.com/media-url.png"
                    fullWidth
                    helperText={helperTextForUrl}
                    type="url"
                  />
                </LabeledInput>
              )}
            />
          )}
          {assetType === "3d" && (
            <>
              <Divider />
              <Typography variant="h5">3D Model Attributes</Typography>
              <div className="models-details">
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
                          <Typography variant="body2">View in AR</Typography>
                          <Typography variant="caption">
                            Enable this option to allow users to view the 3D
                            model in Augmented Reality (AR) on supported
                            devices.
                          </Typography>
                        </div>
                      }
                    />
                  )}
                />
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
                          <Typography variant="body2">Georeferenced</Typography>
                          <Typography variant="caption">
                            Check this box if the 3D model is georeferenced and
                            should be placed at specific coordinates.
                          </Typography>
                        </div>
                      }
                    />
                  )}
                />
                <CoordinatesRow className="coordinates-row">
                  <FormInput
                    name="georeference.lat"
                    render={({ field }) => (
                      <LabeledInput label="Latitude">
                        <TextField
                          {...field}
                          className="coordinate-field"
                          placeholder="ex. 3.123456"
                        />
                      </LabeledInput>
                    )}
                  />
                  <FormInput
                    name="georeference.long"
                    render={({ field }) => (
                      <LabeledInput label="Longitude">
                        <TextField
                          {...field}
                          className="coordinate-field"
                          placeholder="ex. 76.123456"
                        />
                      </LabeledInput>
                    )}
                  />
                </CoordinatesRow>
              </div>
              <Divider />
              <div>
                <Typography variant="h5">Linked Audio</Typography>
                <Typography variant="caption">
                  Upload audio files in multiple languages for users to enjoy
                  while exploring the 3D model.
                </Typography>
              </div>

              <FormInputMultilingual
                name="modelAssetAttributes.linkedAsset.title"
                render={({ field }) => (
                  <LabeledInput label="Audio Title" isMultilingual>
                    <TextField
                      {...field}
                      placeholder="Enter audio title"
                      fullWidth
                    />
                  </LabeledInput>
                )}
              />
              <FormInputMultilingual
                name="modelAssetAttributes.linkedAsset.contentUrl"
                render={({ field }) => (
                  <LabeledInput label="Audio URL" isMultilingual>
                    <TextField
                      {...field}
                      placeholder="https://example.com/audio-url.mp3"
                      fullWidth
                      type="url"
                    />
                  </LabeledInput>
                )}
              />
            </>
          )}
        </div>
        <NoShrink>
          <PoiAssetFooterSection onCancel={onClose} />
        </NoShrink>
      </ContainerStyled>
    </form>
  );
}

export default PoiAssetForm;
