import { styled, Typography } from "@mui/material";

import FormInput from "@/components/form/FormInput";
import EurekaIcon from "@/components/icon/EurekaIcon";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import MarkerInput from "@/components/map-marker-input/MarkerInput";
import MarkerInputFollower from "@/components/map-marker-input/MarkerInputFollower";
import Map from "@/components/map/Map";
import NumberInput from "@/components/number-input/NumberInput";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& .instructions": {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  "& .map-container": {
    height: "500px",
  },
  "& .coordinates-inputs": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(2),
  },
}));

function PoiLocationTab() {
  return (
    <ContainerStyled>
      <div className="instructions">
        <EurekaIcon name="help" />
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          Place a point of interest on the map or add its coordinates in the
          Latitude and Longitude fields below.
        </Typography>
      </div>
      <div className="map-container">
        <Map>
          <MarkerInput name="coordinates" />
          <MarkerInputFollower name="coordinates" />
        </Map>
      </div>
      <div className="coordinates-inputs">
        <FormInput
          name="coordinates.lat"
          render={({ field }) => (
            <LabeledInput label="Latitude">
              <NumberInput {...field} placeholder="ex. 3.123456" />
            </LabeledInput>
          )}
        />
        <FormInput
          name="coordinates.long"
          render={({ field }) => (
            <LabeledInput label="Longitude">
              <NumberInput {...field} placeholder="ex. 101.123456" />
            </LabeledInput>
          )}
        />
      </div>
    </ContainerStyled>
  );
}

export default PoiLocationTab;
