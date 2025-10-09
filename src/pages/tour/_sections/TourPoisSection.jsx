import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Divider, FormControlLabel, styled, Switch } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";
import PoiItem from "../_components/PoiItem";

const ContainerStyled = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& .pois-header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(3, 3, 1.5, 3),
    flexShrink: 0,
  },
  "& .pois-list": {
    padding: theme.spacing(2, 3, 0, 3),
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0, // Important: allows flex child to shrink below content size
    "& .pois-list-scrollable": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
      overflowY: "auto",
      paddingBottom: theme.spacing(3),
    },
  },
}));

function TourPoisSection() {
  const { pois } = useOutletContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { routes } = useNavPaths();

  const handleEdit = (poiId) => {
    console.log(routes.pois.one(poiId));
    navigate(routes.pois.one(poiId), {
      state: { backgroundLocation: location },
    });
  };

  return (
    <ContainerStyled className="pois-section">
      <div className="pois-header">
        <FormControlLabel control={<Switch />} label="Guided Tour" />
        <Button variant="filled" startIcon={<EurekaIcon name="add" />}>
          Add POI
        </Button>
      </div>
      <Divider />
      <div className="pois-list">
        <div className="pois-list-scrollable">
          {pois.map((poi) => (
            <div key={poi.id} className="poi-item-flex-item">
              <PoiItem poi={poi} onEdit={handleEdit} />
            </div>
          ))}
        </div>
      </div>
    </ContainerStyled>
  );
}

export default TourPoisSection;
