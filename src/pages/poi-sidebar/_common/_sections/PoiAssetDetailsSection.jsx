import {
  Checkbox,
  Divider,
  FormControlLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
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

function PoiAssetDetailsSection() {
  return (
    <ContainerStyled>
      <LanguageDropdown className="language-selector" />
      <LabeledInput label="Title">
        <TextField placeholder="Enter media title" fullWidth />
      </LabeledInput>
      <LabeledInput label="Description">
        <TextField
          placeholder="Enter media description"
          fullWidth
          multiline
          rows={4}
        />
      </LabeledInput>
      <LabeledInput label="Media URL">
        <TextField
          placeholder="https://example.com/media-url.png"
          fullWidth
          type="url"
        />
      </LabeledInput>
      <Divider />
      <Typography variant="h5">3D Model Attributes</Typography>
      <div className="models-details">
        <FormControlLabelStyled
          control={<Checkbox />}
          label={
            <div className="checkbox-label">
              <Typography variant="body2">View in AR</Typography>
              <Typography variant="caption">
                Enable this option to allow users to view the 3D model in
                Augmented Reality (AR) on supported devices.
              </Typography>
            </div>
          }
        />
        <FormControlLabelStyled
          control={<Checkbox />}
          label={
            <div className="checkbox-label">
              <Typography variant="body2">Georeferenced</Typography>
              <Typography variant="caption">
                Check this box if the 3D model is georeferenced and should be
                placed at specific coordinates.
              </Typography>
            </div>
          }
        />
        <CoordinatesRow className="coordinates-row">
          <LabeledInput label="Latitude">
            <TextField className="coordinate-field" placeholder="3.123456" />
          </LabeledInput>
          <LabeledInput label="Longitude">
            <TextField className="coordinate-field" placeholder="76.123456" />
          </LabeledInput>
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

      <LabeledInput label="Audio Title">
        <TextField placeholder="Enter audio title" fullWidth />
      </LabeledInput>
      <LabeledInput label="Audio URL">
        <TextField
          placeholder="https://example.com/audio-url.mp3"
          fullWidth
          type="url"
        />
      </LabeledInput>
    </ContainerStyled>
  );
}

export default PoiAssetDetailsSection;
