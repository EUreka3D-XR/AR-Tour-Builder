import { styled, TextField } from "@mui/material";

import LabeledInput from "@/components/labeled-input/LabeledInput";
import Map from "@/components/map/Map";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
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
      <div className="map-container">
        <Map />
      </div>
      <div className="coordinates-inputs">
        <LabeledInput label="Latitude">
          <TextField />
        </LabeledInput>
        <LabeledInput label="Longitude">
          <TextField />
        </LabeledInput>
      </div>
    </ContainerStyled>
  );
}

export default PoiLocationTab;
