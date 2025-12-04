import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <ContainerStyled>
      <div className="instructions">
        <EurekaIcon name="help" />
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {t("poiSidebar.locationTab.instructions")}
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
            <LabeledInput label={t("poiSidebar.locationTab.latitude")}>
              <NumberInput {...field} placeholder={t("poiSidebar.locationTab.latitudePlaceholder")} />
            </LabeledInput>
          )}
        />
        <FormInput
          name="coordinates.long"
          render={({ field }) => (
            <LabeledInput label={t("poiSidebar.locationTab.longitude")}>
              <NumberInput {...field} placeholder={t("poiSidebar.locationTab.longitudePlaceholder")} />
            </LabeledInput>
          )}
        />
      </div>
    </ContainerStyled>
  );
}

export default PoiLocationTab;
