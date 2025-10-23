import {
  Checkbox,
  Divider,
  FormControlLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import FormInput from "@/components/form/FormInput";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import UrlHelperText from "@/components/url-helper-text/UrlHelperText";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
  "& .poi-asset-form-inner": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
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

function PoiAssetForm({ onSubmit }) {
  return (
    <ContainerStyled>
      <form id="poi-asset-form" onSubmit={onSubmit}>
        <div className="poi-asset-form-inner">
          <LanguageDropdown className="language-selector" />
          <FormInputMultilingual
            name="title"
            render={({ field }) => (
              <LabeledInput label="Title">
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
              <LabeledInput label="Description">
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
            name="contentUrl"
            render={({ field }) => (
              <LabeledInput label="Media URL">
                <TextField
                  {...field}
                  placeholder="https://example.com/media-url.png"
                  fullWidth
                  helperText={<UrlHelperText />}
                  type="url"
                />
              </LabeledInput>
            )}
          />
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
                        Enable this option to allow users to view the 3D model
                        in Augmented Reality (AR) on supported devices.
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
              Upload audio files in multiple languages for users to enjoy while
              exploring the 3D model.
            </Typography>
          </div>

          <FormInputMultilingual
            name="modelAssetAttributes.linkedAsset.title"
            render={({ field }) => (
              <LabeledInput label="Audio Title">
                <TextField
                  {...field}
                  placeholder="Enter audio title"
                  fullWidth
                />
              </LabeledInput>
            )}
          />
          <FormInput
            name="modelAssetAttributes.linkedAsset.contentUrl"
            render={({ field }) => (
              <LabeledInput label="Audio URL">
                <TextField
                  {...field}
                  placeholder="https://example.com/audio-url.mp3"
                  fullWidth
                  type="url"
                />
              </LabeledInput>
            )}
          />
        </div>
      </form>
    </ContainerStyled>
  );
}

export default PoiAssetForm;
