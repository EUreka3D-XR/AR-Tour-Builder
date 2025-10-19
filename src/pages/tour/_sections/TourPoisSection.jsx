import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router";
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
    paddingTop: theme.spacing(2),
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
    "& .poi-item-flex-item": {
      margin: theme.spacing(0, 3),
      "&.is-hovered": {
        "& .poi-card": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transform: "translateY(-2px)",
        },
      },
    },
  },
}));

function TourPoisSection() {
  const { pois, containerRef } = useOutletContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { routes } = useNavPaths();

  const handleEdit = (poiId) => {
    navigate(routes.pois.one(poiId), {
      state: { backgroundLocation: location },
    });
  };

  return (
    <>
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
              <div
                key={poi.id}
                className="poi-item-flex-item"
                data-id={poi.id}
                onPointerEnter={() => {
                  if (containerRef?.current) {
                    containerRef.current.dataset.hovered = poi.id;
                    const markerEl = containerRef.current.querySelector(
                      `.custom-poi-marker[data-id="${poi.id}"]`,
                    );
                    console.log(poi.id, markerEl);
                    if (markerEl) markerEl.classList.add("is-hovered");
                  }
                }}
                onPointerLeave={() => {
                  if (containerRef?.current) {
                    delete containerRef.current.dataset.hovered;
                    const markerEl = containerRef.current.querySelector(
                      `.custom-poi-marker[data-id="${poi.id}"]`,
                    );
                    if (markerEl) markerEl.classList.remove("is-hovered");
                  }
                }}
              >
                <PoiItem poi={poi} onEdit={handleEdit} dataId={poi.id} />
              </div>
            ))}
          </div>
        </div>
      </ContainerStyled>
      <Outlet />
    </>
  );
}

export default TourPoisSection;
