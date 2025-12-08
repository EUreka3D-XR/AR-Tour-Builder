import { Outlet, useLocation, useOutletContext, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import {
  CircularProgress,
  Divider,
  FormControlLabel,
  Stack,
  styled,
  Switch,
  Typography,
} from "@mui/material";

import { useTourPois } from "@/services/poiService";
import Button from "@/components/button/Button";
import CenteredArea from "@/components/centered/Centered";
import FormInput from "@/components/form/FormInput";
import EurekaIcon from "@/components/icon/EurekaIcon";
import { useFieldArrayWithId } from "@/hooks/useFieldArrayWithId";
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
  const { t } = useTranslation();
  const { containerRef } = useOutletContext();

  const { tourId } = useParams();
  const location = useLocation();
  const { routes, navigate } = useNavPaths();

  const { data: pois, fetchState } = useTourPois(tourId);

  const isGuided = useWatch({ name: "guided" });
  const { move, remove } = useFieldArrayWithId({
    name: "pois",
  });

  const handleEdit = (poiId) => {
    navigate(routes.pois.edit(poiId), {
      state: { backgroundLocation: location },
    });
  };

  const handleClick = (poiId) => {
    navigate(routes.pois.one(poiId), {
      state: { backgroundLocation: location },
    });
  };

  if (fetchState.isLoading) {
    return (
      <>
        <CenteredArea className="empty-pois-section">
          <CircularProgress size="60px" />
        </CenteredArea>
      </>
    );
  }

  if (fetchState.isError) {
    return (
      <CenteredArea className="empty-pois-section">
        <Typography>{t("tour.pois.errorLoading")}</Typography>
      </CenteredArea>
    );
  }

  if (!pois?.length) {
    return (
      <>
        <CenteredArea className="empty-pois-section">
          <Stack alignItems="center" justifyContent="center">
            <Typography>{t("tour.pois.empty.line1")}</Typography>
            <Typography>{t("tour.pois.empty.line2")}</Typography>
            <br />
            <Button
              variant="filled"
              href={routes.pois.new}
              startIcon={<EurekaIcon name="add" />}
            >
              {t("tour.pois.addPoi")}
            </Button>
          </Stack>
        </CenteredArea>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <ContainerStyled className="pois-section">
        <div className="pois-header">
          <FormInput
            name="guided"
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label={t("tour.pois.guidedTour")}
                />
              );
            }}
          />
          <Button
            variant="filled"
            href={routes.pois.new}
            startIcon={<EurekaIcon name="add" />}
          >
            {t("tour.pois.addPoi")}
          </Button>
        </div>
        <Divider />
        <div className="pois-list">
          <div className="pois-list-scrollable">
            {pois.map((poi, index) => (
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
                <PoiItem
                  poi={poi}
                  index={index + 1}
                  dataId={poi.id}
                  isOrderable={isGuided}
                  isMoveUpDisabled={index === 0}
                  isMoveDownDisabled={index === pois.length - 1}
                  onMoveUp={() => move(index, index - 1)}
                  onMoveDown={() => move(index, index + 1)}
                  onEdit={handleEdit}
                  onClick={handleClick}
                  onRemove={() => remove(index)}
                />
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
