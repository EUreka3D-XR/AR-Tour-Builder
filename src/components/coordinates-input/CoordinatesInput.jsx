import { useTranslation } from "react-i18next";
import { styled, Typography } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import MarkerInput from "@/components/map-marker-input/MarkerInput";
import Map from "@/components/map/Map";
import FormInput from "../form/FormInput";
import LabeledInput from "../labeled-input/LabeledInput";
import MarkerInputFollower from "../map-marker-input/MarkerInputFollower";
import NumberInput from "../number-input/NumberInput";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "coordinates-input",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& .instructions": {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  "& .map-container": {},
  "& .coordinates-inputs": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(2),
  },
}));

function CoordinatesInput({
  className,
  name,
  mapHeight = 400,
  showHelperText,
  showMap,
  defaultBounds,
}) {
  const { t } = useTranslation();

  return (
    <ContainerStyled className={className}>
      {showHelperText && (
        <div className="instructions">
          <EurekaIcon name="help" />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            {t("poiSidebar.locationTab.instructions")}
          </Typography>
        </div>
      )}
      {showMap && (
        <div className="map-container" style={{ height: mapHeight }}>
          <Map bounds={defaultBounds}>
            <MarkerInput name={name} />
            <MarkerInputFollower name={name} />
          </Map>
        </div>
      )}
      <div className="coordinates-inputs">
        <FormInput
          name={`${name}.lat`}
          render={({ field }) => (
            <LabeledInput label={t("coordinates_input.latitude.label")}>
              <NumberInput
                {...field}
                placeholder={t("coordinates_input.latitude.placeholder")}
              />
            </LabeledInput>
          )}
        />
        <FormInput
          name={`${name}.long`}
          render={({ field }) => (
            <LabeledInput label={t("coordinates_input.longitude.label")}>
              <NumberInput
                {...field}
                placeholder={t("coordinates_input.longitude.placeholder")}
              />
            </LabeledInput>
          )}
        />
      </div>
    </ContainerStyled>
  );
}

export default CoordinatesInput;
